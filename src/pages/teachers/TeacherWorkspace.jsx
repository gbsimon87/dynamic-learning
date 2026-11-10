import { createElement } from "react";
import { Link } from "react-router";
import { Icon } from "./TeacherIcons";
import "./TeacherPlanning.css";
import "./TeacherWorkspace.css";

export function TeacherHeader({ title, backTo = "/teachers", backLabel = "Teacher tools", note, context, actions }) {
  return <header className="tp-header">
    <Link className="tp-back tt-no-print" to={backTo}><Icon name="back" />{backLabel}</Link>
    <div className="tp-heading-row">
      <div><h1>{title}</h1>{context && <p className="tw-context">{context}</p>}</div>
      {note && <p className="tp-save-note tt-no-print">{note}</p>}
      {actions && <div className="tw-header-actions tt-no-print">{actions}</div>}
    </div>
  </header>;
}

export default function TeacherWorkspace({ as = "div", className = "", children }) {
  return createElement(as, { className: `teacher-planning teacher-workspace ${className}`.trim() }, children);
}
