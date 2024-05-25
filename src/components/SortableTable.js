import React from "react";
import Table from "./Table";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { func } from "prop-types";
import useSort from "../hooks/use-sort";

export default function SortableTable(props) {
  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );

  const getIcons = (label, sort, sortOrder) => {
    //not in same col(both sortBy an label === col.label)
    if (label !== sortBy) {
      return (
        <div>
          <GoTriangleUp />
          <GoTriangleDown />
        </div>
      );
    }
    if (sortOrder === null) {
      return (
        <div>
          <GoTriangleUp />
          <GoTriangleDown />
        </div>
      );
    } else if (sortOrder === "asc") {
      return (
        <div>
          <GoTriangleUp />
        </div>
      );
    } else if (sortOrder === "desc") {
      return (
        <div>
          <GoTriangleDown />
        </div>
      );
    }
  };

  const updatedConfig = config.map((col) => {
    if (!col.sortValue) {
      //if does not exist than just return the same obj with out any change
      return col;
    }
    //if exist than add header to it with clickHandle on to in order to do sort fun.to add new item to an obj we have to
    //include every default values in it than add other new item(in here new item is header fun)
    return {
      ...col,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(col.label)}
        >
          <div className="flex gap-1 items-center">
            {getIcons(col.label, sortBy, sortOrder)}
            {col.label}
          </div>
        </th>
      ),
    };
  });

  return <Table {...props} config={updatedConfig} data={sortedData} />;
}
