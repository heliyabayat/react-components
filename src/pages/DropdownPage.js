import { useState } from "react";
import Dropdown from "../components/Dropdown";

function DropdownPage() {
  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="flex">
      <Dropdown
        options={options}
        value={selectedOption}
        onChange={handleSelect}
      />
      <Dropdown
        options={options}
        value={selectedOption}
        onChange={handleSelect}
      />
    </div>
  );
}

export default DropdownPage;
