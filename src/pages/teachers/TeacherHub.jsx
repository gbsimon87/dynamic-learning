import { Link } from "react-router";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";
import "./TeacherTools.css";

const TOOLS = [
  { to: "/teachers/planning", title: "Lesson planner", text: "Three-week plans with matching Bix activities." },
  { to: "/teachers/briefings", title: "Topic briefings", text: "Key ideas, common misconceptions and worked examples." },
  { to: "/teachers/reports", title: "Report comment builder", text: "Turn your judgements into editable report comments." },
  { to: "/parent-guides", title: "Parent guides", text: "Share teaching methods and practice ideas with families." },
];

export default function TeacherHub() {
  return <TeacherWorkspace className="teacher-tools">
    <TeacherHeader title="Teacher tools" backTo="/" backLabel="Learn with Bix" note="Years 1–6 · No account needed" />
    <ul className="tt-hub">
      {TOOLS.map((tool) => <li key={tool.to}>
        <Link className="tt-hub-card" to={tool.to}>
          <strong>{tool.title}</strong>
          <span>{tool.text}</span>
        </Link>
      </li>)}
    </ul>
    <p className="tp-quiet tt-privacy">Drafts stay in this browser tab. Copy or print them before leaving.</p>
  </TeacherWorkspace>;
}
