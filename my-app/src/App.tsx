import React, { useCallback, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import SearchBar from './Components/SearchBar';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
import ListGrid from './Components/ListGrid';

interface Filters {
  types: string[],
  generations: string[]
}

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userInput, setUserInput] = useState("eevee");
  const [filters, setFilters] = useState<Filters>({ types: [], generations: [] });

  const handleDataFromList = useCallback((pokemonName) => {
    setUserInput(pokemonName);
    setFilters({ types: [], generations: [] });
  }, []);

  return (
    <div css={container(darkMode)}>
      <Header onDarkMode={setDarkMode} />
      <SearchBar setUserInput={setUserInput} darkMode={darkMode} onFilterSelection={setFilters} />
      {Object.values(filters).flat().length ? (
        <ListGrid filters={filters} setUserInput={handleDataFromList} />
      ) : (
        <MediaGrid searchInput={userInput} filters={filters} />
      )}
    </div>
  );
}

export default App;

const container = (darkMode: boolean) => css`
  text-align: center;
  height: 100vh;
  ${darkMode && css`
    background: #5a4f7c;
    color: white;
  `};
`;
