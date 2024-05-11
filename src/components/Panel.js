import React from "react";
import classNames from "classnames";

export default function Panel({ children, className, ...rest }) {
  const allClassNames = classNames(
    "rounded p-3 shadow bg-white w-full",
    className
  );
  return (
    <div {...rest} className={allClassNames}>
      {children}
    </div>
  );
}
