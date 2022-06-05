import React, { useCallback, useState, useEffect, useRef, isValidElement } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Tooltip } from 'react-tippy';

import SearchBar from './Components/SearchBar';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
import ListGrid from './Components/ListGrid';
import chevron from './icons/chevron.svg';
import Pokedox from './Components/Pokedox';
import Loading from './Components/Loading';

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
  const [showListView, setShowListView] = useState(false);
  const [genData, setGenData] = useState<any[]>([]);
  const [genHolder, setGenHolder] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleDataFromList = useCallback((pokemonName) => {
    setUserInput(pokemonName);
    setFilters({ types: [], generations: [] });
  }, []);

  // going to query all pokemons data so can use that for filters and dont need to query their data again
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species')
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

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/generation")
      .then(response => response.json())
      .then(data => {
        setGenHolder(data.results);
      });
  }, []);


  useEffect(() => {
    if (genHolder.length) {
      Promise.all(
        genHolder.map(gen =>
          fetch(gen.url)
            .then(res => res.json())
        )
      ).then(data => {
        setGenData(data)
      });
    }
  }, [genHolder])

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "#5a4f7c";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300);
  }, [isLoading]);

  const onNextPokemon = useCallback(() => {
    // Get current => get next pokemon after current
    const currentIndex = arrayOfPokemons.indexOf(arrayOfPokemons.find(p => p.name === userInput));
    if (currentIndex + 1 <= arrayOfPokemons.length - 1) {
      setUserInput(arrayOfPokemons[currentIndex + 1].name)
      setPokemonIndex(prevState => ++prevState);
      setIsLoading(true);
    }
  }, [arrayOfPokemons, userInput]);

  const onPrevPokemon = useCallback(() => {
    // Get current => get prev pokemon after current if current is not the first
    const currentIndex = arrayOfPokemons.indexOf(arrayOfPokemons.find(p => p.name === userInput));
    if (currentIndex - 1 >= 0) {
      setUserInput(arrayOfPokemons[currentIndex - 1].name)
      setPokemonIndex(prevState => --prevState);
      setIsLoading(true);
    }
  }, [arrayOfPokemons, userInput]);

  return (
    <div css={container}>
      <Header onDarkMode={setDarkMode} onPokedox={setShowListView} isListView={showListView} isLoading={isLoading} />
      {isLoading ? (
        <Loading />
      ) : (
        <>

          {!showListView && (<SearchBar setUserInput={setUserInput} darkMode={darkMode} onFilterSelection={setFilters} arrayOfPokemons={arrayOfPokemons} />)}
          {Object.values(filters).flat().length ? (
            <ListGrid
              filters={filters}
              setUserInput={handleDataFromList}
            />
          ) : (
            <>
              {showListView ? (
                <Pokedox
                  generationData={genData}
                />
              ) : (
                <>
                  <div css={pokemonNavigationContainerStyle}>
                    {!!pokemonIndex && (
                      <Tooltip
                        title="Previous pokemon"
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
                  <MediaGrid searchInput={userInput} filters={filters} setSearchInput={setUserInput} pokemonIndex={arrayOfPokemons.findIndex(p => p.name === userInput) + 1} />
                </>
              )}
            </>
          )}
        </>
      )}

    </div>
  );
}

export default App;

const container = css`
  text-align: center;
`;

const pokemonNavigationContainerStyle = css`
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

