import React, { useEffect, useState } from "react";

interface SelectGroupTwoProps {
  title: string;
  options: any[];
  name: string; // New prop for the field name
  onSelectChange: (selectedValue: string, name: string) => void;
  defaultValue?: string; 
}

const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({ title, options, name, onSelectChange,defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption(defaultValue || "");
    setIsOptionSelected(!!defaultValue);
  }, [defaultValue]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {title}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
       
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
            onSelectChange(e.target.value, name); // Include name in the callback
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} className="text-body dark:text-bodydark">
              {option.label}
            </option>
          ))}
        </select>

       
      </div>
    </div>
  );
};

export default SelectGroupTwo;
