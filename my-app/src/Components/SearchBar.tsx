import React, { useState, useEffect, useCallback, useMemo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import AutoComplete from './AutoComplete';
import { join } from 'path';
interface ISearchBarProps {
    setUserInput: (value: string) => void;
    darkMode: boolean;
}

interface PokemonsArray {
    name: string;
    url: string;
}

const SearchBar = (props: ISearchBarProps) => {
    const [arrayOfPokemons, setArrayOfPokemons] = useState<PokemonsArray[]>([{ name: "", url: "" }])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1500')
            .then(res => res.json())
            .then(res => {
                console.log(res.results);
                setArrayOfPokemons(res.results);
            });
    }, []);

    const filteredPokemonNames = useMemo(() => {
        return arrayOfPokemons.map(pokemon => pokemon.name).map(name => {
            const splitName = name.split('-');
            // The name most likely has its form name
            if (splitName.length > 2) {
                if (splitName.includes('gmax')) {
                   return `gigantamax ${splitName[0]}`;
                }
                    return splitName[0];
            } else if (splitName.length === 2) {
                if (splitName.includes('gmax')) {
                    return `gigantamax ${splitName[0]}`;
                }
               return `${splitName[0]} ${splitName[1]}`;
            }
            return name;
        });
    }, [arrayOfPokemons]);

    const onSubmit = useCallback((userInput) => {
        const indexName = filteredPokemonNames.findIndex(name => name === userInput);
        if (arrayOfPokemons[indexName]) {
            props.setUserInput(userInput);
        }
    }, [arrayOfPokemons, props, filteredPokemonNames]);

    return <div css={containerStyle}>
        <div css={wrapperStyle}>
            <AutoComplete
                options={filteredPokemonNames}
                onSelection={onSubmit}
                placeholder={'Pokemon'}
                darkMode={props.darkMode}
            />
        </div>
    </div>
};

export default SearchBar

const containerStyle = css`
    margin: auto;
    margin: 20px;
`;

const wrapperStyle = css`
    margin: auto;
    display: flex;
    justify-content: center;
`;
