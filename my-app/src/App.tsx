import React, { useCallback, useState, useEffect, useRef } from 'react';
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

interface PokemonsArray {
  name: string;
  url: string;
}

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userInput, setUserInput] = useState("bulbasaur");
  const [filters, setFilters] = useState<Filters>({ types: [], generations: [] });
  const [numPokemons, setNumPokemons] = useState(0);
  const [arrayOfPokemons, setArrayOfPokemons] = useState<PokemonsArray[]>([]);


  const handleDataFromList = useCallback((pokemonName) => {
    setUserInput(pokemonName);
    setFilters({ types: [], generations: [] });
  }, []);

  // going to query all pokemons data so can use that for filters and dont need to query their data again
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => setNumPokemons(data.count));
  }, []);

  useEffect(() => {
    if (numPokemons) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}`)
        .then(response => response.json())
        .then(data => {
          setArrayOfPokemons(data.results);
        });
    }
  }, [numPokemons]);

  return (
    <div css={container(darkMode)}>
      <Header onDarkMode={setDarkMode} />
      <SearchBar setUserInput={setUserInput} darkMode={darkMode} onFilterSelection={setFilters} arrayOfPokemons={arrayOfPokemons} />
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
