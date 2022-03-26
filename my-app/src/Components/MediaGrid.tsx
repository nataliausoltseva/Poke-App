import React, { useState, useEffect, memo } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { isEmpty } from 'lodash';

import MediaGridItem from './MediaGridItem';
import ProgressBar from './ProgressBar';

interface DefaultItemProps {
    name: string;
    url: string;
}

interface Filters {
    types: string[],
    generations: string[]
}

interface IMediaGridProps {
    searchInput: string | null,
    filters: Filters,
}

interface PokemonByFilters {
    name: string,
    pokemons: DefaultItemProps[]
}

function MediaGrid(props: IMediaGridProps) {
    const [pokemonAbilities, setPokemonAbilities] = useState<DefaultItemProps[]>([{ name: "", url: "" }])
    const [pokemonMoves, setPokemonMoves] = useState<DefaultItemProps[]>([{ name: "", url: "" }])
    const [pokemonTypes, setPokemonTypes] = useState<DefaultItemProps[]>([{ name: "", url: "" }])
    const [pokeID, setPokeID] = useState(0);
    const [pokeWeight, setPokeWeight] = useState(0);
    const [pokeHeight, setPokeHeight] = useState(0);
    const [pokeCaptureRate, setPokeCaptureRate] = useState(0);
    const [pokemonsByTypes, setPokemonsByTypes] = useState<PokemonByFilters[]>([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.searchInput)
            .then(response => response.json())
            .then(response => {
                setPokemonAbilities(response.abilities.map((ability: { ability: DefaultItemProps }) => ability.ability));
                setPokemonTypes(response.types.map((type: { type: DefaultItemProps }) => type.type));
                setPokemonMoves(response.moves.map((move: { move: DefaultItemProps }) => move.move));
                setPokeID(response.id);
                setPokeHeight(response.height / 10);
                setPokeWeight(response.weight / 10);
            });

        fetch('https://pokeapi.co/api/v2/pokemon-species/' + props.searchInput)
            .then(response => response.json())
            .then(response => {
                setPokeCaptureRate(response.capture_rate);
            });

    }, [props]);

    useEffect(() => {
        // Make sure we have some filters set
        if (Object.values(props.filters).some(filter => filter.length)) {
            Object.entries(props.filters).forEach(([key, value]) => {
                // Make sure the arrya is not empty as one of the filters can be empty
                if (value.length) {
                    if (key === 'types') {
                        value.forEach((filter: any) => {
                            fetch(`https://pokeapi.co/api/v2/type/${filter}`)
                                .then(response => response.json())
                                .then(response => {
                                    setPokemonsByTypes(prevState => {
                                        const newFilter = { ...prevState }
                                        newFilter[filter] = response.pokemon;
                                        return newFilter;
                                    });
                                })
                        })
                    }
                }

            });
        }
    }, [props]);

    const front_default = `https://img.pokemondb.net/sprites/home/normal/${props.searchInput}.png`;
    const front_shiny = `https://img.pokemondb.net/sprites/home/shiny/${props.searchInput}.png`;

    // TODO need a better way to find the generation. Check API first
    let generationIn = "";
    for (var index = 0; index < 900; index++) {
        if (pokeID === 0 || pokeID <= 151) {
            generationIn = "Kanto";
        }
        else if (pokeID >= 152 || pokeID <= 251) {
            generationIn = "Johto";
        }
        else if (pokeID >= 252 || pokeID <= 386) {
            generationIn = "Hoenn";
        }
        else if (pokeID >= 287 || pokeID <= 493) {
            generationIn = "Sinnoh";
        }
        else if (pokeID >= 494 || pokeID <= 649) {
            generationIn = "Unova";
        }
        else if (pokeID >= 650 || pokeID <= 721) {
            generationIn = "Kalos";
        }
        else if (pokeID >= 722 || pokeID <= 809) {
            generationIn = "Alola";
        }
        else if (pokeID >= 810) {
            generationIn = "Galar";
        }
    }

    const percentage_rounded = (Math.round(pokeCaptureRate * 100 / 255).toFixed(0));

    return (
        <div css={containerStyle}>
            {Object.values(props.filters).some(filter => filter.length) ? (
                "NO SUPPORT"
            ) : (
                <React.Fragment>
                    <div css={pokemonNameContainerStyle}>
                        <h2 css={pokemonNameStyle}>{props.searchInput}</h2>
                        <h5>Index: {JSON.stringify(pokeID)}</h5>
                        <h5>Generation: {generationIn}</h5>
                    </div>
                    <div css={pokemonInfoWrapperStyle}>
                        <div css={imageCardsContainerStyle}>
                            <img src={front_default} alt="Pokemon's normal form" />
                            <div css={cardHeaderStyle}>
                                {props.searchInput}'s Normal Form
                            </div>
                            <br />
                            <img src={front_shiny} alt="Pokemon's shiny form" />
                            <div css={cardHeaderStyle}>
                                {props.searchInput}'s Shiny Form
                            </div>
                        </div>
                        <br />
                        <div css={statsContainerStyle}>
                            <MediaGridItem
                                items={[
                                    {
                                        header: 'Ability',
                                        options: pokemonAbilities.map(ability => ability.name)
                                    },
                                    {
                                        header: 'Type',
                                        options: pokemonTypes.map(type => type.name)
                                    },
                                    {
                                        header: 'Height',
                                        options: [`${pokeHeight} m`]
                                    }, 
                                    {
                                        header: 'Weight',
                                        options: [`${pokeWeight} kg`]
                                    },
                                    {
                                        header: 'Move',
                                        options: pokemonMoves.map(type => type.name)
                                    }
                                ]}
                            />
                            <ProgressBar
                                header={"Capture rate: "}
                                percentage={parseInt(percentage_rounded)}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}


export default memo(MediaGrid);

const containerStyle = css`
    margin-left: 10px
`;

const pokemonNameContainerStyle = css`
    text-align: left;
`;

const pokemonNameStyle = css`
    text-transform: capitalize;
`;

const pokemonInfoWrapperStyle = css`
    display: flex;
`;

const imageCardsContainerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-space-evenly;
    margin-right: 2em;
`;

const cardHeaderStyle = css`
    text-transform: capitalize;
    font-size: 2.5vh;
`;

const statsContainerStyle = css`
    width: 50%;
`;
