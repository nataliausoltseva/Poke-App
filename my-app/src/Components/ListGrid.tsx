import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface Filters {
    types: string[],
    generations: string[]
}

interface Props {
    filters: Filters,
    setUserInput: (value: string) => void,
}

const ListGrid = (props: Props) => {
    const [pokemons, setPokemons] = useState<Filters>({ types: [], generations: [] });
    useEffect(() => {
        Object.entries(props.filters).forEach(([key, value]) => {
            if (key === 'types') {
                fetch('https://pokeapi.co/api/v2/type/' + value)
                    .then(response => response.json())
                    .then(response => {
                        setPokemons(prevState => {
                            const newState = { ...prevState };
                            let newTypesState = [...newState[key]];
                            newTypesState[value] = response.pokemon.map((pokemon: { pokemon: { name: string }; }) => pokemon.pokemon.name);
                            newState[key] = newTypesState;
                            return newState;
                        })
                    });
            }
        });
    }, [props.filters])
    return (
        <div css={containerStyle}>
            {Object.entries(pokemons).map(([key, value]) => (
                !!Object.values(value).length && (
                    <div key={key}>
                        {console.log(value)}
                        <div css={filterKeyLabelStyle}>{key}</div>
                        <div>
                            {Object.keys(value).map(k => (
                                <div key={k} css={filterTypeLabelStyle}>
                                    <div>{k}</div>
                                    <div css={pokemonNamesStyle}>
                                        {value[k].map((pokemon: string, index: number) => (
                                            <div key={index} css={pokemonNameStyle} onClick={() => props.setUserInput(pokemon)}>{pokemon}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    )
};

export default ListGrid;

const containerStyle = css`
    width: 100%;
    height: fit-content;
`;

const filterKeyLabelStyle = css`
    text-align: left;
    padding: 10px 20px;
    text-transform: capitalize;
    font-size: 24px;
`;

const filterTypeLabelStyle = css`
    text-align: left;
    padding: 10px 20px;
    text-transform: capitalize;
    font-size: 16px;
`;

const pokemonNamesStyle = css`
    display: flex;
    flex-wrap: wrap;
`;

const pokemonNameStyle = css`
    padding: 10px;
    cursor: pointer;

    transition: transform 0.3s ease-in-out;

    :hover {
        transform: scale(1.25);
    }
`;