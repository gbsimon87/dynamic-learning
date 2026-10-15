import { Link, useParams } from 'react-router';
import { findSkillGuide, SKILL_GUIDES } from '../../shared/skillGuides.js';
import NotFound from '../pages/NotFound';
import './SkillGuide.css';
import './CurriculumGuide.css';

// Each subject keeps the same pastel the curriculum guides use for it.
const TONES = { math: 'gold', english: 'lilac', shapes: 'mint', geography: 'rose' };

export default function SkillGuide({ slug: suppliedSlug }) {
  const params = useParams();
  const guide = findSkillGuide(suppliedSlug ?? params.slug);
  if (!guide) return <NotFound />;
  const related = SKILL_GUIDES.filter(item => item.group === guide.group && item.slug !== guide.slug).slice(0, 3);
  const tone = TONES[guide.group] ?? 'lilac';
  return (
    <article className={`skill-guide curriculum-guide skill-guide-game curriculum-tone-${tone}`}>
      <nav aria-label="Breadcrumb" className="skill-guide-breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true"> / </span><Link to="/skills">Skills</Link>
      </nav>
      <header className="curriculum-guide-hero skill-guide-hero">
        <div>
          <p className="curriculum-guide-eyebrow skill-guide-subject">{guide.subject} practice</p>
          <h1>{guide.label}</h1>
          <p className="skill-guide-intro">{guide.description}</p>
          <div className="curriculum-guide-actions">
            <Link className="skill-guide-play" to={guide.to}>Play {guide.label} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="curriculum-guide-badges">
            <span>Free to play</span><span>No account needed</span><span>Choose your level</span>
          </div>
        </div>
        <div className="skill-guide-icon" aria-hidden="true">{guide.icon}</div>
      </header>
      <div className="skill-guide-cards">
        <section aria-labelledby="guide-how" className="curriculum-guide-area">
          <span className="curriculum-guide-area-icon" aria-hidden="true">🎮</span>
          <h2 id="guide-how">How to play</h2>
          <p>{guide.instructions}</p>
        </section>
        <section aria-labelledby="guide-practice" className="curriculum-guide-area">
          <span className="curriculum-guide-area-icon" aria-hidden="true">⭐</span>
          <h2 id="guide-practice">What you can practise</h2>
          <ul className="skill-guide-skills">{guide.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </section>
      </div>
      <p className="curriculum-guide-fit skill-guide-fit">
        <span aria-hidden="true">🦊</span>
        Play at your own pace. Skills Mode is free practice: you can choose any game without an account, and these games do not count towards saved curriculum progress.
      </p>
      {related.length > 0 && <section aria-labelledby="guide-related">
        <h2 id="guide-related">Try another game</h2>
        <ul className="curriculum-guide-games">{related.map(item => (
          <li key={item.slug}><Link to={item.path}>
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.label}</strong>
            <span>Find out more</span>
          </Link></li>
        ))}</ul>
      </section>}
      <Link className="skill-guide-all" to="/skills">Explore all skill games</Link>
    </article>
  );
}
