import React, { useState, useEffect } from 'react';
import './MediaGrid.css';

interface Abilities {
    name: string;
    url: string;
}
interface Types {
    name: string;
    url: string;
}
interface IMediaGridProps {
    SearchQuery: (string | null);
}
function MediaGrid(props: IMediaGridProps) {
    
    const [pokemonAbilities, setPokemonAbilities] = useState<Abilities[]>([{name:"", url:""}])
    const [pokemonTypes, setPokemonTypes] = useState<Types[]>([{name:"", url:""}])
    const [pokeID, setPokeID] = useState(0);
    let abilitiesArray: any[] = [];
    const typesArray: any[] = [];
    // eslint-disable-next-line
    const[arrayOfPokemongs, setArrayOfPokemons] = useState([{}]);
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

    useEffect(() => {
        
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.SearchQuery, {
            headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
        } ).then((response) => response.json())
            .then(response => {  
                if(response.status <200 || response.status>=300){
                    alert("Please enter an English word right (without a space, digits and symbols).");
                    return Promise.reject("Not a right form of word")
                }         
                console.log(response); 
                
                for(var i=0; i< response.abilities.length;i++){
                    abilitiesArray.push(response.abilities[i].ability);
                }
                setPokemonAbilities(abilitiesArray);
                
                for(var j=0; j< response.types.length;j++){
                    typesArray.push(response.types[j].type);
                }
                setPokemonTypes(typesArray);

                setPokeID(response.id);
            

            }).catch(reason => {
                if(reason.response){
                    console.log(reason.response);
                }
            })
            
            // eslint-disable-next-line 
    }, [props.SearchQuery]);
  
    const back_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeID}.png`;
    const front_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
    const back_shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokeID}.png`;
    const front_shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeID}.png`;


    return (
        <div id="div1">
            <span>{props.SearchQuery}</span>
            <br/>
            <br/>
            <div>
                {pokemonAbilities.map((item,i)=>
                <p key={i}>{item.name}</p>)}
            </div>
            <br/>
            <br/>
            <div>
                {pokemonTypes.map((item,i)=>
                <p key={i}>{item.name}</p>)}
            </div>
            <br/>
            <br/>
            <span>{JSON.stringify(pokeID)}</span>
            <br/>
            <img src={back_default} alt=""/>
            <img src={front_default}  alt=""/>
            <br/>
            <img src={back_shiny} alt=""/>
            <img src={front_shiny} alt=""/>

        </div>
    );  

}

export default MediaGrid