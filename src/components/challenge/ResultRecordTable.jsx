import "./science-kit.css";

/** Controlled choice records; the read-only DataTable API stays unchanged. */
export default function ResultRecordTable({ caption, rows, options, record, onRecord, disabled }) {
  return <div className="science-classification-scroll" role="region" aria-label={caption} tabIndex={0}><table className="data-table"><caption>{caption}</caption><thead><tr><th scope="col">Sample or test</th><th scope="col">Your record</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.label}</th><td><div className="science-classification-options" role="group" aria-label={`${row.label}: your record`}>{options.map(option => <button key={option.id} type="button" disabled={disabled} aria-pressed={record[row.id] === option.id} onClick={() => { if (!disabled) onRecord(row.id, option.id); }}>{option.label}</button>)}</div></td></tr>)}</tbody></table></div>;
}
