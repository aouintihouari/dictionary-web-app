import { useState, useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NotFound from "./DefinitionBody/NotFound";
import DefinitionBody from "./DefinitionBody";
import DefinitionContent from "./DefinitionBody/DefinitionContent";

const App = () => {
  const [font, setFont] = useState("sans");
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [searchValue, setSearchValue] = useState("");
  const [word, setWord] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const handleDarkMode = () => setDarkMode(!darkMode);
  const handleFontChange = (font) => setFont(font);
  const handleInputChange = (e) => setSearchValue(e.target.value);
  const handleSynonymSearch = (synonym) => setSearchValue(synonym);
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchDefinition = async () => {
      if (!searchValue.trim()) return;
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
        );
        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.title === "No Definitions Found") {
            setNotFound(true);
            setWord(null);
          }
          throw new Error("Word not found or invalid response");
        }
        const data = await res.json();
        setWord(data);
        setNotFound(false);
        console.log(data);
      } catch (err) {
        console.error("Error fetching definition:", err.message);
      }
    };
    fetchDefinition();
  }, [searchValue]);
  const fontClass =
    font === "sans"
      ? "font-sans"
      : font === "serif"
        ? "font-serif"
        : "font-mono";
  return (
    <main
      className={`flex flex-col p-4 h-full min-h-screen duration-300 bg-white dark:bg-gray-950 lg:items-center ${fontClass}`}
    >
      <Header
        darkMode={darkMode}
        onFontChange={handleFontChange}
        onDarkMode={handleDarkMode}
      />
      <SearchBar onSearch={handleInputChange} />
      {searchValue !== "" && (
        <DefinitionBody>
          {notFound ? (
            <NotFound />
          ) : (
            <DefinitionContent word={word} onSearch={handleSynonymSearch} />
          )}
        </DefinitionBody>
      )}
    </main>
  );
};

export default App;
