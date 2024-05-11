import React from "react";
import useNavigatoin from "../hooks/use-navigation";

export default function Route({ path, children }) {
  const { currentPath } = useNavigatoin();
  if (path === currentPath) {
    return children;
  }
  return null;
}
