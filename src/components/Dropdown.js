import { useState, useEffect, useRef } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {
  const handleOptionClick = (option) => {
    setIsOpen(!isOpen);
    onChange(option);
  };
  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  const [isOpen, setIsOpen] = useState(true);
  const divEl = useRef();
  //we create it in order to recognize that does the click happen inside of component or outside of it ?(checking click location)
  //than if the click happens outside (close the panel) ,for opening it we have handler for it .
  useEffect(() => {
    const handler = (event) => {
      //first we check that is ref el exist or not if is,than...
      divEl.current &&
        // Is the el we are clicking on it the ref one(inside) or not(outside)?,if outside update the state and close it
        !divEl.current.contains(event.target) &&
        setIsOpen(!isOpen);
    };

    document.addEventListener("click", handler, true);

    //when we remove the component from screen the handler fun is not needed any more so we create clean up
    //fun to remove it when component is not shown on the screen
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    //we give a reference to a root el of component
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        {value?.label || "select..."}
        {isOpen ? <GoChevronUp /> : <GoChevronDown />}
        {/* {value ? value  : "select..."} */}
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
