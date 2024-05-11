import React from "react";
import SortableTable from "../components/SortableTable";

export default function TablePage() {
  const data = [
    { name: "orange", color: "bg-orange-500", score: 5 },
    { name: "Apple", color: "bg-red-500", score: 2 },
    { name: "banana", color: "bg-yellow-500", score: 9 },
    { name: "lime", color: "bg-green-500", score: 12 },
  ];
  const config = [
    //each col, each content of cell(header)
    {
      label: "Name",
      render: (rowData) => rowData.name,
      sortValue: (rowData) => rowData.name,
    },
    {
      label: "Color",
      render: (rowData) => <div className={`p-3 m-2 ${rowData.color}`}></div>,
    },
    {
      label: "score",
      render: (rowData) => rowData.score,
      //if we want to add different content to header(not <th> which is default) we make fun for it
      sortValue: (rowData) => rowData.score,
    },
  ];
  const keyFn = (rowData) => {
    return rowData.name;
  };
  return (
    <div>
      <SortableTable data={data} config={config} keyFn={keyFn} />
    </div>
  );
}
