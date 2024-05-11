import { Fragment } from "react";
//we have to add key but without adding new el in the dom and table els do not let to add other el(like div for add key)
//inside of it ,so we have fragment to do it

export default function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map((col) => {
    if (col.header) {
      return <Fragment key={col.label}>{col.header()}</Fragment>;
    }
    return <th key={col.label}>{col.label}</th>;
  });
  const renderedRows = data.map((rowData) => {
    const renderCells = config.map((col) => {
      return (
        <td className="p-2" key={col.label}>
          {col.render(rowData)}
        </td>
      );
    });
    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {renderCells}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
