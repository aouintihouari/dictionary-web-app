import { useRef, useEffect } from "react";

const DefinitionContent = ({ word, onSearch }) => {
  const audioRef = useRef(null);
  const audioUrl = word?.[0]?.phonetics?.find((p) => p.audio)?.audio || "";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async () => {
    if (!audioUrl) return;
    try {
      if (!audioRef.current) audioRef.current = new Audio(audioUrl);
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (error) {
      console.error("Error during audio reading", error);
    }
  };

  if (!word || !word[0]) return <div>Loading...</div>;

  console.log(word);

  return (
    <>
      <div className="flex justify-between items-center my-6">
        <div className="flex flex-col">
          <h1 className="heading-l text-gray-800 dark:text-white">
            {word[0].word}
          </h1>
          <h2 className="heading-m text-accent-purple ">
            {word[0].phonetics[1]?.text}
          </h2>
        </div>
        {audioUrl && (
          <button
            className="cursor-pointer hover:opacity-75 transition-opacity"
            onClick={handlePlay}
            aria-label="Listen to pronunciation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75"
            >
              <g fill="#A445ED" fillRule="evenodd">
                <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                <path d="M29 27v21l21-10.5z" />
              </g>
            </svg>
          </button>
        )}
      </div>
      {word[0].meanings.map((meaning, meaningIdx) => (
        <div key={meaningIdx} className="mb-8">
          <div className="flex items-center dark:text-white text-gray-800">
            <span className="mr-4 italic heading-m">
              {meaning.partOfSpeech}
            </span>
            <span className="h-[0.25px] mt-2 w-full dark:bg-gray-700 bg-gray-100"></span>
          </div>
          <div className="my-8">
            <h3 className="heading-s dark:text-gray-600 mb-4">Meaning</h3>
            <ul className="list-disc list-inside space-y-2">
              {meaning.definitions.map((definition, idx) => (
                <li
                  key={idx}
                  className="dark:text-white marker:text-accent-purple-500 text-gray-800"
                >
                  {definition.definition}
                  {definition.example && (
                    <div className="mt-2 ml-4 italic text-gray-600 dark:text-gray-400">
                      "{definition.example}"
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {meaning.synonyms && meaning.synonyms.length > 0 && (
              <div className="mt-4">
                <span className="heading-s dark:text-gray-600 mr-4">
                  Synonyms
                </span>
                <span className="text-accent-purple font-bold">
                  {meaning.synonyms.map((synonym, synonymIdx) => (
                    <span key={synonymIdx}>
                      <button
                        onClick={() => onSearch && onSearch(synonym)}
                        className="text-accent-purple hover:underline cursor-pointer transition-all hover:opacity-75"
                      >
                        {synonym}
                      </button>
                      {synonymIdx < meaning.synonyms.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">Source</span>
          <a
            href={word[0].sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-white underline hover:text-accent-purple dark:hover:text-accent-purple transition-colors flex items-center"
          >
            {word[0].sourceUrls[0]}
            <svg
              className="ml-2 w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default DefinitionContent;
