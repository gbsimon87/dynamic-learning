import "./challenge-kit.css";

/**
 * A simple table — the fourth representation the statutory list names, and
 * the only one with no picture at all. Reading a table is a different skill
 * from reading a chart: you find a row and a column and meet in the middle,
 * so a table can point at the line it is asking about.
 *
 * `columns`  [{ key, label }]
 * `rows`     [{ label, cells: { [key]: value } }]
 * `blank`    { row, column } — renders that one cell as a slot to fill in
 * `highlight`{ row, column } — points at a line or a single cell
 *
 * A highlight naming only a row (or only a column) lights that HEADER and
 * nothing else: it says "this is the row I am asking about" without lighting
 * the number, which would hand over the answer. A body cell lights only when
 * both the row and the column are named.
 */
function DataTable({ caption, columns, rows, blank, highlight, blankValue }) {
  const cellHighlighted = (rowLabel, columnKey) =>
    Boolean(highlight) &&
    highlight.row === rowLabel &&
    highlight.column === columnKey;

  const headerHighlighted = (rowLabel, columnKey) => {
    if (!highlight) return false;
    if (rowLabel !== undefined) return highlight.row === rowLabel;
    return highlight.column === columnKey;
  };

  return (
    <table className="data-table">
      {caption && <caption className="data-caption">{caption}</caption>}
      <thead>
        <tr>
          <td className="data-corner" />
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={headerHighlighted(undefined, column.key) ? "highlight" : ""}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th
              scope="row"
              className={headerHighlighted(row.label, undefined) ? "highlight" : ""}
            >
              {row.label}
            </th>
            {columns.map((column) => {
              const isBlank =
                blank && blank.row === row.label && blank.column === column.key;
              return (
                <td
                  key={column.key}
                  className={`${cellHighlighted(row.label, column.key) ? "highlight" : ""} ${
                    isBlank ? "blank" : ""
                  }`}
                >
                  {isBlank ? blankValue ?? "?" : row.cells[column.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
