import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { IUserInput } from '../Common/interfaces'
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import AutoComplete from './AutoComplete';
interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
    darkMode: boolean;
}

interface PokemonsArray {
    name: string;
    url: string;
}

function SearchBar(props: ISearchBarProps) {
    const [SearchQuery, setSearchQuery] = useState('');
    const handleSearchQueryChange = (s: string) => {
        var loweCaseString = s.toLowerCase()
        setSearchQuery(loweCaseString);
    }
    const [arrayOfPokemons, setArrayOfPokemons] = useState<PokemonsArray[]>([{name:"", url:""}])
    let pokemons: any[] = [];

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=810&offset=0')
            .then(res => res.json())
            .then(res => {            
                for(var count = 0; count < res.results.length; count++) {
                    pokemons.push(res.results[count]);
                }
                setArrayOfPokemons(pokemons);      
            });
    }, []);  
    
    useEffect(() => {
        if (SearchQuery) {
            handleSubmit();
        }
    }, [SearchQuery]);

    const handleSubmit = () => {
        if (arrayOfPokemons.some(item => item.name === SearchQuery)) {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
            }
            props.SetUserInput(UserInput);
                
        }
    }

    const checkValue = (value:any)=> {
        if(value===null){
            return;
        }
        else if ( arrayOfPokemons.some(item => item.name === value.name)) {
            setSearchQuery(value.name);
        }
        else {
            return;
        }
    }
    return <div css={containerStyle}>
        <div css={wrapperStyle}>
            <AutoComplete
                options={arrayOfPokemons.map(pokemon => pokemon.name)}
                onSelection={(searchKey) => setSearchQuery(searchKey)}
                placeholder={'Pokemon'}
                darkMode={props.darkMode}
            />
        </div>
    </div>
}
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

const extraStyleAutoCompleteStyle = (darkMode: boolean) => css`
    width: 35vh;
    padding-right: 10px;

    ${darkMode && css`
        .MuiInputLabel-root, .MuiInputLabel-root {
            color: white !important;
           
        }
        .MuiInput-underline:before {
            border-bottom-color: white !important;
        }
        .MuiInput-underline:after {
            border-bottom-color: white !important;
        }
    `};

`;