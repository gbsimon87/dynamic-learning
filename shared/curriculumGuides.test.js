import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM_GUIDES, GUIDE_SUBJECTS, curriculumGuideFor, findCurriculumGuide } from './curriculumGuides.js';
import { CURRICULUM_YEARS, CURRICULUM_SUBJECTS, loadCurriculum } from '../src/data/curriculumRegistry.js';
import { SKILL_GROUPS } from './skillsCatalog.js';
import { getPageSeo, PUBLIC_PATHS } from './seo.js';

// Public descriptions must follow actual content, including category identity,
// rather than silently dropping topics or publishing an unimplemented path.
test('all twenty public guides cover every category of their implemented pathway', () => {
  assert.equal(CURRICULUM_GUIDES.length, 20);
  assert.equal(new Set(CURRICULUM_GUIDES.map(guide => guide.path)).size, 20);
  assert.equal(new Set(CURRICULUM_GUIDES.map(guide => guide.intro)).size, 20);
  for (const year of CURRICULUM_YEARS) for (const subject of CURRICULUM_SUBJECTS) {
    const guide = curriculumGuideFor(year, subject.id);
    assert.ok(guide, `missing Year ${year} ${subject.name}`);
    assert.equal(findCurriculumGuide(guide.slug), guide);
    const curriculum = loadCurriculum(year, subject.id);
    assert.deepEqual(guide.areas.map(area => area.categoryId), curriculum.map(category => category.id), guide.label);
    for (const area of guide.areas) {
      assert.ok(area.title && area.description && area.example && area.icon, `${guide.label}: incomplete area`);
      assert.ok(['mint', 'rose', 'gold', 'lilac'].includes(area.colour));
    }
    assert.ok(GUIDE_SUBJECTS[subject.id].practical);
  }
  assert.equal(findCurriculumGuide('year-5-maths'), undefined);
  assert.equal(curriculumGuideFor(4, 'music'), undefined);
});

test('every guide has distinct public metadata and a correct breadcrumb', () => {
  for (const guide of CURRICULUM_GUIDES) {
    const seo = getPageSeo(guide.path);
    assert.ok(PUBLIC_PATHS.includes(guide.path));
    assert.ok(seo.title.includes(guide.label));
    assert.equal(seo.robots, 'index, follow');
    assert.equal(seo.canonical, `https://learnwithbix.com${guide.path}`);
    const breadcrumb = seo.structuredData['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    assert.deepEqual(breadcrumb.itemListElement.map(item => item.name), ['Home', 'What we teach', guide.label]);
  }
});

test('free practice only links to existing standalone games and practical gaps stay explicit', () => {
  const gamePaths = new Set(SKILL_GROUPS.flatMap(group => group.games.map(game => game.to)));
  for (const guide of CURRICULUM_GUIDES) {
    if (guide.games) {
      assert.equal(guide.games.length, 3);
      for (const game of guide.games) assert.ok(gamePaths.has(game.to), game.to);
    } else {
      assert.ok(['science', 'history'].includes(guide.subject));
      assert.equal(guide.activities.length, 3);
    }
    if (['geography', 'history'].includes(guide.subject)) assert.ok(guide.alignment.includes('does not cover the whole key stage'));
    if (guide.subject === 'english' && guide.year >= 3) assert.ok(guide.alignment.includes('shared Years 3–4'));
  }
});
