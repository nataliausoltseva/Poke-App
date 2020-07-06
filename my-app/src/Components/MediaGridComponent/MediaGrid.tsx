import React, { useState, useEffect, useRef } from 'react';
///import ImageCard from '../ImageCardComponent/ImageCard';
import './MediaGrid.css';
import { ListItemSecondaryAction } from '@material-ui/core';
//import { Grid } from '@material-ui/core';
//import Card from '@material-ui/core/Card';

interface Abilities {
    abilities: any[];
}
interface Types {
    types: any[];
}
interface ImageBackNormal {
    backNormal: "";
}
interface ImageFrontNormal {
    frontNormal: "";
}
interface ImageBackShiny {
    backShiny: "";
}
interface ImageFrontShiny {
    frontShiny: "";
}

interface IMediaGridProps {
    SearchQuery: (string | null);
}
function MediaGrid(props: IMediaGridProps) {
    // eslint-disable-next-line
    //const [pokemonAbilities, setPokemonAbilities] = useState<Abilities[]>([{abilities: []}]);
    const [pokemonAbilities, setPokemonAbilities] = useState([{}]);
    //const [pokemonTypes, setPokemonTypes] = useState<Types[]>([{types: []}]);
    const [pokemonTypes, setPokemonTypes] = useState([{}]);
    const [pokemonBackNormal, setPokemonBackNormal] = useState([("")])
    const [pokemonFrontNormal, setPokemonFrontNormal] = useState<ImageFrontNormal[]>([{frontNormal: ''}]);
    const [pokemonBackShiny, setPokemonBackShiny] = useState<ImageBackShiny[]>([{backShiny: ""}]);
    const [pokemonFrontShiny, setPokemonFrontShiny] = useState<ImageFrontShiny[]>([{frontShiny: ''}]);
    const [pokeID, setPokeID] = useState([{}]);
    let abilitiesArray: any[] = [];
    const typesArray: any[] = [];
    //let pokemonBackNormal = ""
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.SearchQuery)
            .then(response => response.json())
            .then(response => {               
                console.log(response); 
                for(var i=0; i< response.abilities.length;i++){
                    abilitiesArray.push(response.abilities[i].ability.name);
                }
                setPokemonAbilities(abilitiesArray);

                for(var j=0; j< response.types.length;j++){
                    typesArray.push(response.types[j].type.name);
                }
                setPokemonTypes(typesArray);
                
                setPokemonBackNormal(response.sprites.back_default);
                setPokemonFrontNormal(response.sprites.front_default);
                setPokemonBackShiny(response.sprites.back_shiny);
                setPokemonFrontShiny(response.sprites.front_shiny);
                setPokeID(response.id);

            })
            .catch(() => console.log("it didn't work")
            );
            //console.log(abilitiesArray);
    }, [props.SearchQuery]);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeID}.png`;
    console.log(pokemonTypes);
    return (
        <div id="div1">
            <span>{props.SearchQuery}</span>
            <br/>
            <br/>
            <span>{JSON.stringify(pokemonAbilities)}</span>
            <br/>
            <br/>
            <span>{JSON.stringify(pokemonTypes)}</span>
            <br/>
            <br/>
            <span>{JSON.stringify(pokeID)}</span>
            <br/>
            <img src={image}/>

        </div>
    );  

}

export default MediaGrid