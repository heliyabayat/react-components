import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
export default function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    //we add it to prevent scrolling fun when modal is open
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
//the portal helps us to render and place code in other parts of dom which we select
//we put it in index.html to be expandable in all of the page(index.html is main parent)
