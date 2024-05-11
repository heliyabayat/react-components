import React from "react";
import Table from "./Table";
import { useState } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

export default function SortableTable(props) {
  //we are checking that does sortValue exist in each config obj or not.
  const { config, data } = props;
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleClick = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };
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
          onClick={() => handleClick(col.label)}
        >
          <div className="flex gap-1 items-center">
            {getIcons(col.label, sortBy, sortOrder)}
            {col.label}
          </div>
        </th>
      ),
    };
  });
  //default data of fruits obj
  let sortedData = data;
  if (sortOrder && sortBy) {
    //why {sortValue}
    const { sortValue } = config.find((col) => col.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return <Table {...props} config={updatedConfig} data={sortedData} />;
}
