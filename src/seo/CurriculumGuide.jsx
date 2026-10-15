import { Link, useParams } from 'react-router';
import { CURRICULUM_GUIDES, GUIDE_SUBJECTS, findCurriculumGuide } from '../../shared/curriculumGuides.js';
import { CURRICULUM_YEARS, loadCurriculum } from '../data/curriculumRegistry';
import Mascot from '../components/mascot/Mascot';
import NotFound from '../pages/NotFound';
import './SkillGuide.css';
import './CurriculumGuide.css';

function Actions() {
  return (
    <div className="curriculum-guide-actions">
      <Link className="skill-guide-play" to="/signup">Create an account <span aria-hidden="true">→</span></Link>
      <Link className="curriculum-guide-secondary" to="/skills">Try a free game</Link>
    </div>
  );
}

function Hero({ guide, curriculum = [] }) {
  const subject = guide ? GUIDE_SUBJECTS[guide.subject] : null;
  const topicCount = curriculum.reduce((sum, category) => sum + category.topics.length, 0);
  return (
    <header className="curriculum-guide-hero">
      <div>
        <p className="curriculum-guide-eyebrow">A little curiosity. A lot to discover.</p>
        <h1>{guide ? `${guide.label} with Bix` : 'What we teach'}</h1>
        <p className="skill-guide-intro">{guide?.intro ?? 'Find your child’s next learning adventure. Take a look around before signing up.'}</p>
        <div className="curriculum-guide-badges">
          <span>{guide ? `Usually ages ${guide.year + 4}–${guide.year + 5}` : 'Years 1–4 · 5 subjects'}</span>
          <span>{guide ? `${topicCount} topics · ${curriculum.length} areas` : 'Explore before signing up'}</span>
        </div>
        <Actions />
      </div>
      <div className="curriculum-guide-bix" aria-hidden="true">
        <span className="curriculum-guide-doodle">{subject?.doodle ?? 'So much to try!'}</span>
        <Mascot decorative />
        <span className="curriculum-guide-bix-caption">{subject?.caption ?? 'What will you discover?'}</span>
      </div>
    </header>
  );
}

export function CurriculumOverview() {
  return (
    <article className="skill-guide curriculum-guide">
      <nav aria-label="Breadcrumb" className="skill-guide-breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true"> / </span><span>What we teach</span>
      </nav>
      <Hero />
      <nav aria-label="Choose a year" className="curriculum-guide-jumps">
        {CURRICULUM_YEARS.map(year => <a key={year} href={`#year-${year}`}>Year {year} <span aria-hidden="true">↓</span></a>)}
      </nav>
      {CURRICULUM_YEARS.map(year => (
        <section id={`year-${year}`} aria-labelledby={`overview-year-${year}`} key={year}>
          <p className="curriculum-guide-eyebrow">{year < 3 ? 'First discoveries · Key stage 1' : 'Growing connections · Lower key stage 2'}</p>
          <h2 id={`overview-year-${year}`}>Explore Year {year}</h2>
          <p>Usually ages {year + 4}–{year + 5}. Choose a subject to see what’s inside.</p>
          <div className="curriculum-overview-grid">
            {CURRICULUM_GUIDES.filter(guide => guide.year === year).map(guide => {
              const subject = GUIDE_SUBJECTS[guide.subject];
              return (
                <Link className={`curriculum-overview-card curriculum-subject-${guide.subject}`} to={guide.path} key={guide.slug}>
                  <span className="curriculum-overview-icon" aria-hidden="true">{subject.icon}</span>
                  <span><strong>{guide.label}</strong><span>{guide.intro}</span><span className="curriculum-overview-tags">Take a look <span aria-hidden="true">→</span></span></span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      <aside className="curriculum-guide-note">
        <h2>Go at your child’s pace</h2>
        <p>These paths follow the curriculum in England. Choose by confidence and learning needs, as well as age. Free practice games are available <Link to="/skills">without an account</Link>.</p>
      </aside>
    </article>
  );
}

function Practice({ guide }) {
  if (guide.games) {
    return (
      <section id="practice" aria-labelledby="practice-title" className="curriculum-guide-practice">
        <p className="curriculum-guide-eyebrow">A taste of the fun</p>
        <h2 id="practice-title">Try a game. No signup needed.</h2>
        <ul className="curriculum-guide-games">
          {guide.games.map(game => (
            <li key={game.to}><Link to={game.to}><span aria-hidden="true">{game.icon}</span><strong>{game.label}</strong><span>{game.description}</span><span aria-hidden="true">Play →</span></Link></li>
          ))}
        </ul>
        <p className="curriculum-guide-small">Free games span different levels and don’t count towards saved curriculum progress.</p>
      </section>
    );
  }
  return (
    <section id="practice" aria-labelledby="practice-title" className="curriculum-guide-practice">
      <p className="curriculum-guide-eyebrow">Keep the curiosity going</p>
      <h2 id="practice-title">Little ideas to try together</h2>
      <ul className="curriculum-guide-games">
        {guide.activities.map(activity => (
          <li className="curriculum-guide-activity" key={activity.title}><span aria-hidden="true">{activity.icon}</span><strong>{activity.title}</strong><p>{activity.description}</p></li>
        ))}
      </ul>
      <p className="curriculum-guide-small">Want to try Bix first? <Link to="/skills">Browse our free skills games</Link>. The {GUIDE_SUBJECTS[guide.subject].name} path starts with an account.</p>
    </section>
  );
}

export default function CurriculumGuide({ slug: suppliedSlug }) {
  const params = useParams();
  const guide = findCurriculumGuide(suppliedSlug ?? params.slug);
  if (!guide) return <NotFound />;
  const subject = GUIDE_SUBJECTS[guide.subject];
  const curriculum = loadCurriculum(guide.year, guide.subject);
  const related = CURRICULUM_GUIDES.filter(item => item.year === guide.year && item.subject !== guide.subject);
  return (
    <article className="skill-guide curriculum-guide">
      <nav aria-label="Breadcrumb" className="skill-guide-breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true"> / </span><Link to="/what-we-teach">What we teach</Link><span aria-hidden="true"> / </span><span>{guide.label}</span>
      </nav>
      <Hero guide={guide} curriculum={curriculum} />
      <nav aria-label="On this page" className="curriculum-guide-jumps">
        <a href="#coverage">Explore the topics <span aria-hidden="true">↓</span></a>
        <a href="#how">How it works</a><a href="#practice">{guide.games ? 'Free games' : 'Ideas to try'}</a>
      </nav>
      <aside className="curriculum-guide-fit">
        <span aria-hidden="true">🌱</span>
        <div><h2>A good next step?</h2><p>{guide.fit} Choose by confidence and learning needs, as well as age.</p></div>
      </aside>
      <section id="coverage" aria-labelledby="coverage-title">
        <p className="curriculum-guide-eyebrow">{subject.eyebrow}</p>
        <h2 id="coverage-title">What does Bix cover?</h2>
        <p>Explore {curriculum.length} areas, one little challenge at a time.</p>
        <div className="curriculum-guide-areas">
          {guide.areas.map((area, index) => {
            const category = curriculum.find(item => item.id === area.categoryId);
            return (
              <section className={`curriculum-guide-area curriculum-tone-${area.colour}`} key={category.id} aria-labelledby={`area-${index}`}>
                <span className="curriculum-guide-area-icon" aria-hidden="true">{area.icon}</span>
                <h3 id={`area-${index}`}>{area.title}</h3>
                <p>{area.description}</p>
                <p className="curriculum-guide-example">{area.example}</p>
                <details>
                  <summary>See all {category.topics.length} topics</summary>
                  <ul>{category.topics.map(topic => <li key={topic.id}>{topic.name}</li>)}</ul>
                </details>
              </section>
            );
          })}
        </div>
      </section>
      <section id="how" aria-labelledby="how-title">
        <p className="curriculum-guide-eyebrow">Small steps, growing confidence</p>
        <h2 id="how-title">Learn it. Try it. Keep going.</h2>
        <ol className="curriculum-guide-steps">
          <li><span aria-hidden="true">💬</span><h3>A little help from Bix</h3><p>{guide.introStep ?? subject.introStep}</p></li>
          <li><span aria-hidden="true">🧩</span><h3>Have a go</h3><p>Four challenges per topic, with pictures, puzzles and interactive activities.</p></li>
          <li><span aria-hidden="true">🌟</span><h3>See progress grow</h3><p>Completed steps unlock the next. Progress stays with your child’s profile.</p></li>
        </ol>
      </section>
      <Practice guide={guide} />
      <section id="start" aria-labelledby="start-title" className="curriculum-guide-start">
        <h2 id="start-title">Ready for the first little step?</h2>
        <p>Add your child’s learning details, choose {guide.label} and finish setting up your parent account.</p>
        <Actions /><p className="curriculum-guide-small">Already part of Bix? <Link to="/login">Sign in</Link>.</p>
      </section>
      <details className="curriculum-guide-alignment">
        <summary>For parents: curriculum & practical learning</summary>
        <p>{guide.alignment} Topic counts don’t certify full statutory coverage or mastery.</p>
        <p>{guide.practical ?? subject.practical}</p>
        <p>Independently developed, with no UK government affiliation or endorsement. Reviewed 15 October 2026.</p>
      </details>
      <nav className="curriculum-guide-related" aria-label={`More Year ${guide.year} subjects`}>
        <h2>More to discover in Year {guide.year}</h2>
        <div className="curriculum-guide-jumps">{related.map(item => <Link to={item.path} key={item.slug}><span aria-hidden="true">{GUIDE_SUBJECTS[item.subject].icon}</span>{GUIDE_SUBJECTS[item.subject].name}</Link>)}</div>
      </nav>
      <a className="skill-guide-all" href={`/what-we-teach#year-${guide.year}`}>← Back to what we teach</a>
    </article>
  );
}
