import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM_GUIDES, GUIDE_SUBJECTS, curriculumGuideFor, findCurriculumGuide } from './curriculumGuides.js';
import { CURRICULUM_YEARS, CURRICULUM_SUBJECTS, isCurriculumAvailable, loadCurriculum } from '../src/data/curriculumRegistry.js';
import { SKILL_GROUPS } from './skillsCatalog.js';
import { getPageSeo, PUBLIC_PATHS } from './seo.js';

// Public descriptions must follow actual content, including category identity,
// rather than silently dropping topics or publishing an unimplemented path.
test('all thirty-five public guides cover every category of their implemented or staged pathway', () => {
  assert.equal(CURRICULUM_GUIDES.length, 35);
  assert.equal(new Set(CURRICULUM_GUIDES.map(guide => guide.path)).size, 35);
  assert.equal(new Set(CURRICULUM_GUIDES.map(guide => guide.intro)).size, 35);
  for (const year of CURRICULUM_YEARS) for (const subject of CURRICULUM_SUBJECTS) {
    if (!isCurriculumAvailable(year, subject.id)) continue;
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
  assert.equal(CURRICULUM_GUIDES.length, CURRICULUM_YEARS.reduce((sum, year) => sum + CURRICULUM_SUBJECTS.filter(subject => isCurriculumAvailable(year, subject.id)).length, 0));
  assert.equal(findCurriculumGuide('year-6-maths').year, 6);
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
      assert.ok(['science', 'history', 'art', 'computing', 'design', 'french', 'music', 'pe', 'wellbeing'].includes(guide.subject));
      assert.equal(guide.activities.length, 3);
    }
    if (['geography', 'history'].includes(guide.subject)) assert.ok(guide.alignment.includes('does not cover the whole key stage'));
    if (guide.subject === 'english' && guide.year >= 3) assert.ok(guide.alignment.includes(guide.year >= 5 ? 'shared Years 5–6' : 'shared Years 3–4'));
  }
});


test('Year 6 Maths public guide describes the complete pathway', () => {
  const guide = curriculumGuideFor(6, 'math');
  assert.match(guide.intro, /full Year 6 Maths course/);
  assert.match(guide.fit, /four short challenges per topic/);
  for (const area of guide.areas) assert.doesNotMatch(area.description, /Coming soon|pilot/i);
  assert.match(guide.alignment, /full course maps/);
});
