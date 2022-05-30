import React, { useCallback, useState, useEffect, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Tooltip } from 'react-tippy';

import SearchBar from './Components/SearchBar';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
import ListGrid from './Components/ListGrid';
import chevron from './icons/chevron.svg';

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
  const [arrayOfPokemons, setArrayOfPokemons] = useState<PokemonsArray[] | any[]>([]);
  const [pokemonIndex, setPokemonIndex] = useState(0);

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

  const onNextPokemon = useCallback(() => {
    // Get current => get next pokemon after current
    const currentIndex = arrayOfPokemons.indexOf(arrayOfPokemons.find(p => p.name === userInput));
    if (currentIndex + 1 <= arrayOfPokemons.length - 1) {
      setUserInput(arrayOfPokemons[currentIndex + 1].name)
      setPokemonIndex(prevState => ++prevState);
    }
  }, [arrayOfPokemons, userInput]);

  const onPrevPokemon = useCallback(() => {
    // Get current => get prev pokemon after current if current is not the first
    const currentIndex = arrayOfPokemons.indexOf(arrayOfPokemons.find(p => p.name === userInput));
    if (currentIndex - 1 >= 0) {
      setUserInput(arrayOfPokemons[currentIndex - 1].name)
      setPokemonIndex(prevState => --prevState);
    }
  }, [arrayOfPokemons, userInput]);

  return (
    <div css={container(darkMode)}>
      <Header onDarkMode={setDarkMode} />
      <SearchBar setUserInput={setUserInput} darkMode={darkMode} onFilterSelection={setFilters} arrayOfPokemons={arrayOfPokemons} />
      {Object.values(filters).flat().length ? (
        <ListGrid filters={filters} setUserInput={handleDataFromList} />
      ) : (
        <>
          <div css={pokemonNavigationContainerStyle(userInput !== "bulbasaur")}>
            {!!pokemonIndex && (
              <Tooltip
                title="Next pokemon"
                position="bottom"
              >
                <div onClick={onPrevPokemon}><img src={chevron} css={chevronStyle()} /></div>
              </Tooltip>
            )}
            <span>Pokemon navigation</span>
            {(pokemonIndex < arrayOfPokemons.length) && (
              <Tooltip
                title="Next pokemon"
                position="bottom"
              >
                <div onClick={onNextPokemon}>

                  <img src={chevron} css={chevronStyle(true)} />
                </div>
              </Tooltip>

            )}
          </div>
          <MediaGrid searchInput={userInput} filters={filters} setSearchInput={setUserInput} />
        </>
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

const pokemonNavigationContainerStyle = (canGoBack: boolean = false) => css`
    display: flex;
    width: 100%;
    justify-content: center;

    div {
      :hover {
        cursor: pointer;
        transform: scale(1.1)
      }
    }
`;

const chevronStyle = (isNext: boolean = false) => css`
  transform: rotate(${isNext && '-'}90deg);
`;

