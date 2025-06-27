const NotFound = () => (
  <div className="flex flex-col items-center text-center mt-10 space-y-4">
    <span className="text-5xl">😕</span>
    <h2 className="font-bold heading-s text-xl dark:text-white text-gray-800 my-6">
      No Definitions Found
    </h2>
    <p className="body-m text-gray-600 dark:text-gray-600 max-w-md">
      Sorry pal, we couldn't find definitions for the word you were looking for.
      You can try the search again at a later time or head to the web instead.
    </p>
  </div>
);

export default NotFound;
