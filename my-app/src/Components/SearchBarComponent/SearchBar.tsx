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
        
        
        //console.log(arrayOfPokemongs.some(item => item.name === SearchQuery));
        // Deleted from if statement: SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== ""
        if (arrayOfPokemongs.some(item => item.name === SearchQuery)) {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
            }
            props.SetUserInput(UserInput);
                
        } else {
            setHasFocus(true);
            alert("Please enter a correct form of a pokemon name");
               
        }

    }
    //
    return <div className="SearchBarContainer">
        <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
                <TextField
                    required
                    id="outlined-required"
                    label="Enter pokemon's name (lowercase)"
                    variant="outlined"
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