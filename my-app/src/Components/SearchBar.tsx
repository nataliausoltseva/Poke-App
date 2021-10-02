import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { IUserInput } from '../Common/interfaces'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from 'react-bootstrap/Button';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

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
    const [HasFocus, setHasFocus] = useState<boolean>(false);
    const [arrayOfPokemongs, setArrayOfPokemons] = useState<PokemonsArray[]>([{name:"", url:""}])
    let pokemons: any[] = [];

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=810&offset=0')
            .then(res => res.json())
            .then(res => {            
                for(var count = 0; count < res.results.length; count++) {
                    pokemons.push(res.results[count]);
                }
                setArrayOfPokemons(pokemons);
                
            })

    }, []);  
    
    useEffect(() => {
        if (SearchQuery) {
            handleSubmit();
        }
    }, [SearchQuery]);

    const handleSubmit = () => {
        if (arrayOfPokemongs.some(item => item.name === SearchQuery)) {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
            }
            props.SetUserInput(UserInput);
                
        } else {
            setHasFocus(true);
            alert("This error could happen due to pokemon name is not in the database or the input is empty. If there are any mistakes in the word (the name should be in lowercase), please fix. Try again afterwards. \n\nRemember, this app would not be able to provide pokemon's data if it appears in the Generations VII or VIII.");
        }
    }

    const checkValue = (value:any)=>{
        if(value===null){
            return;
        }
        else if ( arrayOfPokemongs.some(item => item.name === value.name)) {
            setSearchQuery(value.name);
        }
        else {
            return;
        }
    }
    return <div css={containerStyle}>
        <Grid container spacing={1}>
            <div css={wrapperStyle}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={arrayOfPokemongs}
                    getOptionLabel={(option) => option.name}
                    css={extraStyleAutoCompleteStyle(props.darkMode)}
                    getOptionSelected={(option, value) => option.name === value.name}
                    onChange={(event, value)=> checkValue(value)}
                    renderInput={(params) =>
                    <TextField {...params}
                        label="Pokemon's name"
                        error={HasFocus && SearchQuery===""}
                        {...SearchQuery && {value: SearchQuery}}
                        onChange={event => handleSearchQueryChange(event.target.value)}/>}
                />
            </div>
        </Grid>
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