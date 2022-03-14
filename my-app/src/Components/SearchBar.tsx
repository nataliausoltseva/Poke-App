import React, { useState, useEffect, useCallback } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import AutoComplete from './AutoComplete';
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
            .then(res => setArrayOfPokemons(res.results));
    }, []);

    const onSubmit = useCallback((userInput) => {
        if (arrayOfPokemons.find(item => item.name === userInput)) {
            props.setUserInput(userInput);

        }
    }, [arrayOfPokemons, props]);

    return <div css={containerStyle}>
        <div css={wrapperStyle}>
            <AutoComplete
                options={arrayOfPokemons.map(pokemon => pokemon.name)}
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
