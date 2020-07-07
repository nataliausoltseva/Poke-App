import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { IUserInput } from '../../Common/interfaces'
import './SearchBar.css';

interface ISearchBarProps {
    SetUserInput: (a: IUserInput) => void;
}

function SearchBar(props: ISearchBarProps) {
       const [SearchQuery, setSearchQuery] = useState<string | null>("");
    const handleSearchQueryChange = (s: string | null) => {
        setSearchQuery(s);
    }
    const [HasFocus, setHasFocus] = useState<boolean>(false);

    const handleSubmit = () => {
        console.log(SearchQuery);

        if (SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== "") {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
            }
            props.SetUserInput(UserInput);
        } else {
            setHasFocus(true);
        }
    }
    
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

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Search
                </Button>
            </Grid>
        </Grid>
    </div>
}

export default SearchBar