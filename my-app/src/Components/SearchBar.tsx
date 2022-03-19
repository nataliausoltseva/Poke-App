import React, { useState, useEffect, useCallback, useMemo, SetStateAction } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import AutoComplete from './AutoComplete';
import Filter from './Filter';
import types from '../poke/default';

interface ISearchBarProps {
    setUserInput: (value: string) => void;
    darkMode: boolean;
    onFilterSelection: (value: Filters) => void,
}

interface PokemonsArray {
    name: string;
    url: string;
}

interface Filters {
    types: string[],
    generations: string[]
}

const SearchBar = (props: ISearchBarProps) => {
    const [arrayOfPokemons, setArrayOfPokemons] = useState<PokemonsArray[]>([{ name: "", url: "" }]);
    const [filters, setFilters] = useState<Filters>({ types: [], generations: [] });

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

    const onFilterSelection = useCallback((filterOption: string) => {
        const isTypeFilter = types.types.includes(filterOption);
        setFilters(prevState => {
            let newFiltersList = isTypeFilter ? [...prevState.types] : [...prevState.generations]
            if (newFiltersList.includes(filterOption)) {
                newFiltersList = newFiltersList.filter(filter => filter !== filterOption);
            } else {
                newFiltersList.push(filterOption);
            }

            const newFilters = {
                ...isTypeFilter ? {
                    types: newFiltersList,
                    generations: prevState.generations,
                } : {
                    generations: newFiltersList,
                    types: prevState.types,
                }
            }
            props.onFilterSelection(newFilters);
            return newFilters
        });
    }, [props]);

    console.log(filters)

    return <div css={containerStyle}>
        <div css={wrapperStyle}>
            <AutoComplete
                options={filteredPokemonNames}
                onSelection={onSubmit}
                placeholder={'Pokemon'}
                darkMode={props.darkMode}
            />
            <Filter
                filters={[
                    {
                        label: 'Type',
                        options: types.types,
                        selectedOptions: filters.types,
                        onSelection: onFilterSelection
                    },
                    {
                        label: "Generation",
                        options: types.generations,
                        selectedOptions: filters.generations,
                        onSelection: onFilterSelection
                    }
                ]}
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
