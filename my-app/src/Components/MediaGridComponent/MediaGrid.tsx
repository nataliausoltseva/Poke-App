import React, { useState, useEffect } from 'react';
import './MediaGrid.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, CardContent, Typography, makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles({
    root: {
        paddingRight: 20,
        width: 200,
    },
    
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function MediaGrid(props: IMediaGridProps) {
    
    const classes = useStyles();
    
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

    const kanto = [];
    for(var k = 1; k<=151;k++){
        kanto.push(k);
    }
    const johto = [];
    for(var j = 152; j<=251;j++){
        johto.push(j);
    }
    const hoenn = [];
    for(var ko = 252; ko<=386;ko++){
        hoenn.push(ko);
    }
    const sinnoh = [];
    for(var s = 387; s<=493;s++){
        sinnoh.push(s);
    }
    const unova = [];
    for(var u = 494; u<=649;u++){
        unova.push(u);
    }
    const kalos = [];
    for(var ka = 650; ka<=721;ka++){
        kalos.push(k);
    }
    const alola = [];
    for(var al = 722; al<=809;al++){
        alola.push(al);
    }
    const galar = [];
    for(var g = 810; g<=893;g++){
        galar.push(g);
    }

    let generationIn = "";
    for(var indexk=0; indexk< kanto.length;indexk++){
        if(pokeID === kanto[indexk]){
            generationIn="Kanto";
        }
    }
    for(var indexj=0; indexj< johto.length;indexj++){
        if(pokeID === johto[indexj]){
            generationIn="Johto";
        }
    }
    for(var indexh=0; indexh< hoenn.length;indexh++){
        if(pokeID === hoenn[indexh]){
            generationIn="Hoenn";
        }
    }
    for(var indexs=0; indexs< sinnoh.length;indexs++){
        if(pokeID === sinnoh[indexs]){
            generationIn="Sinnoh";
        }
    }
    for(var indexu=0; indexu< unova.length;indexu++){
        if(pokeID === unova[indexu]){
            generationIn="Unova";
        }
    }
    for(var indexkal=0; indexkal< kalos.length;indexkal++){
        if(pokeID === kalos[indexkal]){
            generationIn="Kalos";
        }
    }
    for(var indexalo=0; indexalo< alola.length;indexalo++){
        if(pokeID === alola[indexalo]){
            generationIn="Alola";
        }
    }
    for(var indexgal=0; indexgal< galar.length;indexgal++){
        if(pokeID === galar[indexgal]){
            generationIn="Galar";
        }
    }

    return (
        <div id="div1">
            <h1  style={{textTransform:"capitalize"}}>{props.SearchQuery}</h1>
            <h5>Index: {JSON.stringify(pokeID)}</h5>
            <h5>Generation: {generationIn}</h5>
            <br/>
            <br/>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                <Card style={{ minWidth: '200px', border:"none" }}>
                    <Card.Body>
                    <Card.Title style={{textTransform:"capitalize", fontWeight: "bold"}}>{props.SearchQuery}'s normal form</Card.Title>
                    </Card.Body>
                    <div style={{alignItems:"inline"}}>
                        <Card.Img variant="top" src={back_default} />
                        <Card.Img variant="top" src={front_default} />
                    </div>
                </Card>
                <Card style={{ minWidth: '200px', border:"none" }}>
                    <Card.Body>
                    <Card.Title style={{textTransform:"capitalize", fontWeight: "bold"}}>{props.SearchQuery}'s shiny form</Card.Title>
                    </Card.Body>
                    <div style={{alignItems:"inline"}}>
                        <Card.Img variant="top" src={back_shiny} />
                        <Card.Img variant="top" src={front_shiny} />
                    </div>
                </Card>
            </Grid>
            <br/>
            <div style={{padding: 50, display:"inline-block"}}>
                <Card className={classes.root} >
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                        Abilities
                        </Typography>
                        <Typography variant="body2" component="p">
                        {pokemonAbilities.map((item,i)=>
                        <li key={i}>{item.name}</li>)}
                        
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card className={classes.root}>
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                        Types
                        </Typography>
                        
                        <Typography variant="body2" component="p">
                        {pokemonTypes.map((item,i)=>
                        <li key={i}>{item.name}</li>)}
                        
                        </Typography>
                    </CardContent>
                </Card>
                </div>
        </div>
    );  

}

export default MediaGrid