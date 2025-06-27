import { useState, useRef, useEffect } from "react";

const fontOptions = [
  { value: "sans", label: "Sans Serif", family: "Inter, sans-serif" },
  { value: "serif", label: "Serif", family: "Lora, serif" },
  { value: "mono", label: "Mono", family: "Inconsolata, monospace" },
];

const FontSelector = ({ onFontChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("sans");
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selectedFont = fontOptions.find((opt) => opt.value === font);
  const handleFontChange = (value) => {
    setFont(value);
    onFontChange(value);
    setIsOpen(false);
  };
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-0 py-2 text-left cursor-pointer transition-colors 
                   text-gray-800 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
      >
        <span
          className="text-lg font-bold min-w-[100px]"
          style={{ fontFamily: selectedFont?.family }}
        >
          {selectedFont?.label}
        </span>
        <svg
          className={`w-3.5 h-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 8"
          fill="none"
        >
          <path
            stroke="#A445ED"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m1 1 6 6 6-6"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-48 z-50 rounded-2xl 
                     bg-white shadow-[0_8px_10px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.05)]
                     dark:bg-gray-900 dark:shadow-[0_12px_24px_rgba(164,69,237,0.4)]"
        >
          <div className="py-3 rounded-2xl">
            {fontOptions.map((option) => {
              const isSelected = font === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleFontChange(option.value)}
                  className={`w-full px-6 cursor-pointer duration-300 py-3 text-left text-lg font-bold transition-colors
                    ${
                      isSelected
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-800 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                    }`}
                  style={{ fontFamily: option.family }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
