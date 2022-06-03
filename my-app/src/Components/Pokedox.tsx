import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Tooltip } from 'react-tippy';

import chevron from '../icons/chevron.svg';

interface Props {
    generationData: any[],
}

const Pokedox = (props: Props) => {
    const [pokedoxIndex, setPokedoxIndex] = useState(0);
    const [genPokemon, setGenPokemon] = useState<any[]>([])
    useEffect(() => {
        if (props.generationData.length) {
            Promise.all(
                props.generationData[pokedoxIndex].pokemon_species.map((pokemon: { name: string }) =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                        .then(res => res.json())
                )
            ).then(data => {
                setGenPokemon(data)
            });
        }
    }, [pokedoxIndex, props.generationData]);

    return (
        <div>
            <div css={generationLabelStyle}>{props.generationData[pokedoxIndex].main_region.name}</div>
            <div css={paginationContainerStyle(!!pokedoxIndex)}>
                {!!pokedoxIndex && (
                    <Tooltip
                        title="Previous generation"
                        position="bottom"
                    >
                        <div onClick={() => setPokedoxIndex(prev => prev - 1)}>
                            <img src={chevron} css={chevronStyle(false)} />
                        </div>
                    </Tooltip>
                )}
                {(pokedoxIndex < props.generationData.length) && (
                    <Tooltip
                        title="Next generation"
                        position="bottom"
                    >
                        <div onClick={() => setPokedoxIndex(prev => prev + 1)}>
                            <img src={chevron} css={chevronStyle(true)} />
                        </div>
                    </Tooltip>

                )}

            </div>
            <div css={pokemonContainerStyle}>
                {genPokemon.map((pokemon, pokemonIndex) => (
                    <div key={pokemonIndex}>
                        <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="Pokemon's normal form" />
                        <div css={pokemonNameStyle}>{pokemon.name}</div>
                        <div css={typesContainerStyle}>
                            {pokemon.types.map((type: { type: { name: string; }; }) => type.type.name).join(', ')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Pokedox;

const pokemonContainerStyle = css`
    display: flex;
    flex-wrap: wrap;
`;

const pokemonNameStyle = css`
    text-transform: capitalize;
`;

const typesContainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const generationLabelStyle = css`
    text-align: left;
    text-transform: capitalize;
    font-size: 20px;
    margin-left: 10px;
`;

const paginationContainerStyle = (canGoBack: boolean) => css`
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;

    ${!canGoBack && css`
        justify-content: end;
    `}
`;

const chevronStyle = (isNext: boolean = false) => css`
  transform: rotate(${isNext && '-'}90deg);
`;