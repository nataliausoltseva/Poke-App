import React, { useState, useEffect } from 'react';
import './MediaGrid.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
    const [pokeWeight, setPokeWeight] = useState(0);
    const [pokeHeight, setPokeHeight] = useState(0);
    const [pokeCaptureRate, setPokeCaptureRate] = useState(0);
    let abilitiesArray: any[] = [];
    const typesArray: any[] = [];
    // eslint-disable-next-line
    
    
   
    
    useEffect(()=> {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.SearchQuery,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            
            if(response.status < 200 || response.status >= 300  ) {
                alert("Please enter a correct pokemon's name (without a space, digits and symbols but also in lowercase as well).");
                return Promise.reject("Incorrect pokemon's name")
            }else {
                return response.json();
            }
            
            }).then(data => {  
     
                //console.log(data); 
                
                for(var i=0; i< data.abilities.length;i++){
                    abilitiesArray.push(data.abilities[i].ability);
                }
                setPokemonAbilities(abilitiesArray);
                
                for(var j=0; j< data.types.length;j++){
                    typesArray.push(data.types[j].type);
                }
                setPokemonTypes(typesArray);
                setPokeID(data.id);
                let heightpo = data.height /10;
                setPokeHeight(heightpo);
                let weightpo = data.weight/10;
                setPokeWeight(weightpo);
        
    });
    // eslint-disable-next-line
}, [props.SearchQuery]);

useEffect(()=> {
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + props.SearchQuery,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {  
            setPokeCaptureRate(response.capture_rate);
            
    
});
// eslint-disable-next-line
}, [props.SearchQuery]);
    const front_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
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

    const progressCaptureRate = <ProgressBar now={pokeCaptureRate} label={`${pokeCaptureRate}%`}/>

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
                <Card style={{ width: '200px', border:"none" }}>
                    <Card.Body>
                    <Card.Title style={{textTransform:"capitalize", fontWeight: "bold"}}>{props.SearchQuery}'s normal form</Card.Title>
                    </Card.Body>
                    <div style={{alignItems:"inline"}}>
                        <Card.Img variant="top" src={front_default} />
                    </div>
                </Card>
                <Card style={{ width: '200px', border:"none" }}>
                    <Card.Body>
                    <Card.Title style={{textTransform:"capitalize", fontWeight: "bold"}}>{props.SearchQuery}'s shiny form</Card.Title>
                    </Card.Body>
                    <div style={{alignItems:"inline"}}>
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
                        Type
                        </Typography>
                        
                        <Typography variant="body2" component="p">
                        {pokemonTypes.map((item,i)=>
                        <li key={i}>{item.name}</li>)}
                        
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card className={classes.root}>
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                        Stats
                        </Typography>
                        
                        <Typography variant="body2" component="p">
                        Height: {pokeHeight} m
                        </Typography>
                        <Typography variant="body2" component="p">
                        Weight: {pokeWeight} kg
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card >
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                        Capture rate
                        </Typography>
                        {progressCaptureRate}
                        
                    </CardContent>
                </Card>
                </div>
        </div>
    );  

}

export default MediaGrid