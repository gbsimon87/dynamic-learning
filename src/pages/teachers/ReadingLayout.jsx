import { sectionId } from "./readingSections";

export default function ReadingLayout({ sections, children }) {
  return <div className="ar-reading-layout">
    <nav className="ar-contents tt-no-print" aria-label="On this page">
      <p className="ar-card-label">On this page</p>
      {sections.map((title) => <a key={title} href={`#${sectionId(title)}`}>{title}</a>)}
    </nav>
    <div className="ar-reading-body">{children}</div>
  </div>;
}
