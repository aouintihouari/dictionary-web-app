const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full lg:w-3/6">
      <div className="p-8 duration-300 transition-colors">
        <div className="relative">
          <input
            type="text"
            onChange={onSearch}
            className="w-full h-12 px-4 pr-12 text-base font-medium
                       bg-gray-100 dark:bg-gray-800
                       text-gray-900 dark:text-white
                       placeholder:text-gray-500 dark:placeholder:text-gray-400
                       border-0 rounded-2xl
                       focus:outline-none focus:ring-2 caret-accent-purple focus:ring-purple-500
                       transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="text-purple-600 dark:text-purple-400"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
