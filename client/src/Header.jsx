import FontSelector from "./Header/FontSelector";
import DarkModeSwitch from "./Header/DarkModeSwitch";

const Header = ({ onFontChange, darkMode, onDarkMode }) => {
  return (
    <header className="flex lg:w-3/6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="38"
            viewBox="0 0 34 38"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="#838383"
              strokeLinecap="round"
              strokeWidth="1.5"
            >
              <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
              <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
              <path d="M11 9h12" />
            </g>
          </svg>
        </div>
        <div className="flex items-center space-x-6">
          <FontSelector onFontChange={onFontChange} />
          <div className="h-8 w-px bg-gray-600 dark:bg-gray-100"></div>
          <div className="flex items-center space-x-4">
            <DarkModeSwitch darkMode={darkMode} onDarkMode={onDarkMode} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
