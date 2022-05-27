import React, { useState, useCallback, useMemo, memo, useRef } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import AutoComplete from './AutoComplete';
import Filter from './Filter';
import types from '../poke/default';

interface ISearchBarProps {
    setUserInput: (value: string) => void;
    darkMode: boolean;
    onFilterSelection: (value: Filters) => void,
    arrayOfPokemons: PokemonsArray[]
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
    const [filters, setFilters] = useState<Filters>({ types: [], generations: [] });

    const userInputHolder = useRef("");


    const filteredPokemonNames = useMemo(() => {
        return props.arrayOfPokemons.map(pokemon => pokemon.name).map(name => {
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
    }, [props.arrayOfPokemons]);

    const onSubmit = useCallback((userInput) => {
        const indexName = filteredPokemonNames.findIndex(name => name === userInput);
        if (props.arrayOfPokemons[indexName] && userInputHolder.current !== userInput) {
            props.setUserInput(userInput);
            userInputHolder.current = userInput;
        }
    }, [props.arrayOfPokemons, props, filteredPokemonNames]);

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

export default memo(SearchBar)

const containerStyle = css`
    margin: auto;
    margin: 20px;
`;

const wrapperStyle = css`
    margin: auto;
    display: flex;
    justify-content: center;
`;
