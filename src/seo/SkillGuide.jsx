import { Link, useParams } from 'react-router';
import { findSkillGuide, SKILL_GUIDES } from '../../shared/skillGuides.js';
import NotFound from '../pages/NotFound';
import './SkillGuide.css';

export default function SkillGuide({ slug: suppliedSlug }) {
  const params = useParams();
  const guide = findSkillGuide(suppliedSlug ?? params.slug);
  if (!guide) return <NotFound />;
  const related = SKILL_GUIDES.filter(item => item.group === guide.group && item.slug !== guide.slug).slice(0, 3);
  return (
    <article className="skill-guide">
      <nav aria-label="Breadcrumb" className="skill-guide-breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true"> / </span><Link to="/skills">Skills</Link>
      </nav>
      <header>
        <p className="skill-guide-subject">{guide.subject} practice</p>
        <h1><span aria-hidden="true">{guide.icon} </span>{guide.label}</h1>
        <p className="skill-guide-intro">{guide.description}</p>
        <Link className="skill-guide-play" to={guide.to}>Play {guide.label} <span aria-hidden="true">→</span></Link>
      </header>
      <section aria-labelledby="guide-how">
        <h2 id="guide-how">How to play</h2>
        <p>{guide.instructions}</p>
      </section>
      <section aria-labelledby="guide-practice">
        <h2 id="guide-practice">What you can practise</h2>
        <ul>{guide.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        <p>Play at your own pace. Skills Mode is free practice: you can choose any game without an account, and these games do not count towards saved curriculum progress.</p>
      </section>
      {related.length > 0 && <section aria-labelledby="guide-related">
        <h2 id="guide-related">Try another game</h2>
        <ul className="skill-guide-related">{related.map(item => <li key={item.slug}><Link to={item.path}>{item.label}</Link></li>)}</ul>
      </section>}
      <Link className="skill-guide-all" to="/skills">Explore all skill games</Link>
    </article>
  );
}
