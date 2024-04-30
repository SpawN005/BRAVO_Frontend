import React, { forwardRef, useState } from "react";
const CheckboxFour = forwardRef(({ label, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor={label}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            ref={ref}
            {...props}
            type="checkbox"
            id={label}
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && "border-green-400"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && "!bg-green-400"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
});
CheckboxFour.displayName = "CheckboxFour";
export default CheckboxFour;
