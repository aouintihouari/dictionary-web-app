const DarkModeSwitch = ({ darkMode, onDarkMode }) => {
  return (
    <>
      <button
        onClick={onDarkMode}
        className={`
        relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer
        transition-colors duration-300 ease-in-out
        ${darkMode ? "bg-purple-600" : "bg-gray-500"}
      `}
      >
        <span
          className={`
          inline-block h-6 w-6 transform rounded-full bg-white
          transition-transform duration-300 ease-in-out
          ${darkMode ? "translate-x-7" : "translate-x-1"}
        `}
        />
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
      >
        <path
          fill="none"
          stroke={`${darkMode ? "#A445ED" : "#838383"}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
        />
      </svg>
    </>
  );
};

export default DarkModeSwitch;
