import { useState, useEffect } from "react";

interface ToggleSwitchProps {
  onToggle?: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
}

const ToggleSwitch = ({
  onToggle,
  defaultChecked = false,
  disabled = false,
}: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newState = e.target.checked;
    setChecked(newState);

    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="toggle"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="peer sr-only opacity-0"
      />

      <label
        htmlFor="toggle"
        className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full px-0.5 
        transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow 
        before:transition-transform before:duration-300 
        ${checked ? "bg-green-500" : "bg-gray-400"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        peer-checked:before:translate-x-full`}
      >
        <span className="sr-only">Toggle Availability</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
