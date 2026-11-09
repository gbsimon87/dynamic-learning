import { Link } from "react-router";
import { Icon } from "./TeacherIcons";
import "./TeacherPlanning.css";
import "./TeacherTools.css";

const TOOLS = [
  { to: "/teachers/planning", title: "Plan your next three weeks", text: "Turn what your class needs into an editable plan with matching Bix activities.", label: "Planning" },
  { to: "/teachers/briefings", title: "Topic briefings", text: "Before you teach a topic: the key ideas, common misconceptions, vocabulary and how Bix models it.", label: "Subject knowledge" },
  { to: "/teachers/reports", title: "Report comment builder", text: "Draft an end-of-year report comment in a minute from your judgements, then edit and copy it.", label: "Reports" },
  { to: "/parent-guides", title: "Parent guides", text: "Plain-English guides to how column subtraction, phonics, times tables and more are taught. Send a link home or print.", label: "Parents" },
];

export function TeacherBack({ to = "/teachers", children = "Teacher tools" }) {
  return <Link className="tp-back" to={to}><Icon name="back" />{children}</Link>;
}

export default function TeacherHub() {
  return <div className="teacher-planning teacher-tools">
    <header className="tp-header">
      <TeacherBack to="/">Learn with Bix</TeacherBack>
      <h1>Teacher tools</h1>
      <p className="tp-lede">Time-saving tools for the everyday jobs around teaching Years 1 to 6. Free to use, no account needed.</p>
    </header>
    <ul className="tt-hub">
      {TOOLS.map((tool) => <li key={tool.to}>
        <Link className="tt-hub-card" to={tool.to}>
          <span className="tt-kicker">{tool.label}</span>
          <strong>{tool.title}</strong>
          <span>{tool.text}</span>
        </Link>
      </li>)}
    </ul>
    <p className="tp-quiet tt-privacy">Nothing you type into these tools is saved or sent anywhere. Refreshing the page clears it.</p>
  </div>;
}
