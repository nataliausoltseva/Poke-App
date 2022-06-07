import React, { useCallback, useContext, useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Tooltip } from 'react-tippy';

import chevron from '../icons/chevron.svg';

interface Props {
    generationData: any[],
}

const Pokedox = (props: Props) => {
    const [pokedoxIndex, setPokedoxIndex] = useState(0);
    const [genPokemon, setGenPokemon] = useState<any[]>([]);

    useEffect(() => {
        if (props.generationData.length) {
            Promise.all(
                props.generationData[pokedoxIndex].pokemon_species
                    .sort((p1: {
                        url: any; match: (arg0: RegExp) => any[];
                    }, p2: {
                        url: any; match: (arg0: RegExp) => any[];
                    }) => {
                        let _p1 = Number(p1.url.match(/https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(.*)\//)[1])
                        let _p2 = Number(p2.url.match(/https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/(.*)\//)[1])
                        return _p1 < _p2 ? -1 : _p1 > _p2 ? 1 : 0
                    })
                    .map((pokemon: { name: string }) =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                            .then(res => res.json())
                    )
            ).then(data => {
                setGenPokemon(data)
            });
        }
    }, [pokedoxIndex, props.generationData]);

    return (
        <div css={containerStyle}>
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
                    <div key={pokemonIndex} css={pokeCardStyle}>
                        <div css={innerStyle}>
                            <div css={frontCardStyle}>
                                <div>#{pokemonIndex + 1}</div>
                                <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt="Pokemon's normal form" />
                                <div css={pokemonNameStyle}>{pokemon.name}</div>
                                <div css={typesContainerStyle}>
                                    {pokemon.types.map((type: { type: { name: string; }; }) => type.type.name).join(', ')}
                                </div>
                            </div>
                            <div css={backCardStyle}>
                                Something else
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Pokedox;

const containerStyle = css`
    margin: 0 10px;
`;

const pokemonContainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
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

const pokeCardStyle = css`
    box-shadow: 0px 0px 4px 0px black;
    border-radius: 12px;
    min-width: 150px;
    margin-bottom: 20px;
    perspective: 1000px;

    :hover {
        > div {
            transform: rotateY(180deg);
        }
    }
`;

const innerStyle = css`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
`;

const frontCardStyle = css`
backface-visibility: hidden;
`;

const backCardStyle = css`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    backface-visibility: hidden;
`;