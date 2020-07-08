import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { IUserInput } from '../../Common/interfaces'
import './SearchBar.css';

interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}
interface PokemonsArray {
    name: string;
    url: string;
}


function SearchBar(props: ISearchBarProps) {
    const [SearchQuery, setSearchQuery] = useState<string>("");
    const handleSearchQueryChange = (s: string) => {
        setSearchQuery(s);
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
    });
           
    const handleSubmit = () => {
        if (arrayOfPokemongs.some(item => item.name === SearchQuery)) {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
            }
            props.SetUserInput(UserInput);
                
        } else {
            setHasFocus(true);
            alert("This error could happen due to pokemon name is not in the database or the input is empty. If there are any mistakes in the word (the name should be in lowercase), please fix. Try again afterwards. \nRemember, this app would not be able to provide pokemon's data if it appears in the Generations VII or VIII.");
               
        }

    }
    //
    return <div className="SearchBarContainer">
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="standard-helperText"
                    label="pokemon's name"
                    helperText="lowercase only"
                    error={HasFocus && SearchQuery === ""}
                    onClick={() => setHasFocus(true)}
                    value={SearchQuery}
                    onChange={e => handleSearchQueryChange(e.target.value)}
                />
                <Button variant="contained" color="primary" type="button"  onClick={handleSubmit}>
                    Search
                </Button>
            </Grid>
        </Grid>
    </div>
}

export default SearchBar