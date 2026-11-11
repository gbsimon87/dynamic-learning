import { Link } from "react-router";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";
import { Icon } from "./TeacherIcons";
import "./TeacherTools.css";
import "./AdultResources.css";

const TOOLS = [
  { to: "/teachers/practice", icon: "print", label: "Prepare", title: "Practice sheet builder", text: "Printable practice for Years 1–6. Choose your year, subject and topics, with separate answer keys." },
  { to: "/teachers/planning", icon: "calendar", label: "Plan", title: "Lesson planner", text: "Three-week plans with matching Bix activities." },
  { to: "/teachers/briefings", icon: "list", label: "Prepare", title: "Topic briefings", text: "Key ideas, common misconceptions and worked examples." },
  { to: "/teachers/reports", icon: "sliders", label: "Report", title: "Report comment builder", text: "Turn your judgements into editable report comments." },
  { to: "/parent-guides", icon: "home", label: "Connect", title: "Parent guides", text: "Share teaching methods and practice ideas with families." },
];

export default function TeacherHub() {
  return <TeacherWorkspace className="teacher-tools adult-resources adult-hub">
    <TeacherHeader title="Teacher tools" backTo="/" backLabel="Learn with Bix" note="Years 1–6 · No account needed" />
    <p className="ar-intro">A little less admin. More room to teach.</p>
    <p className="ar-description">Practical tools for planning, preparing and keeping families in the loop.</p>
    <ul className="tt-hub">
      {TOOLS.map((tool) => <li key={tool.to}>
        <Link className="tt-hub-card" to={tool.to}>
          <span className="ar-tool-top"><span className="ar-tool-icon"><Icon name={tool.icon} /></span><span className="ar-card-label">{tool.label}</span><span className="ar-arrow" aria-hidden="true">↗</span></span>
          <strong>{tool.title}</strong>
          <span>{tool.text}</span>
        </Link>
      </li>)}
    </ul>
    <p className="tp-quiet tt-privacy">Drafts stay in this browser tab. Copy or print them before leaving.</p>
  </TeacherWorkspace>;
}
