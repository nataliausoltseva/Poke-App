import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Typography, makeStyles, Card,  createStyles, Theme, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface Abilities {
    name: string;
    url: string;
}
interface Types {
    name: string;
    url: string;
}
interface AbilityInfo{
    name: string; // by name i mean the language name
    url: string;
    effect: string;
}

interface IMediaGridProps {
    SearchQuery: (string | null);
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        maxWidth: 400,
    
      },
      picRoot: {
          maxWidth: 300
      }
  }),
);
  
function MediaGrid(props: IMediaGridProps) {

    const classes = useStyles();
    // eslint-disable-next-line
    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);
    const [pokemonAbilities, setPokemonAbilities] = useState<Abilities[]>([{name:"", url:""}])
    const [pokemonTypes, setPokemonTypes] = useState<Types[]>([{name:"", url:""}])
    const [pokeID, setPokeID] = useState(0);
    const [pokeWeight, setPokeWeight] = useState(0);
    const [pokeHeight, setPokeHeight] = useState(0);
    const [pokeCaptureRate, setPokeCaptureRate] = useState(0);
    let abilitiesArray: any[] = [];
    const typesArray: any[] = [];
    
    useEffect(()=> {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.SearchQuery)
        .then(response => response.json())
        .then(response => {
            for(var i=0; i< response.abilities.length;i++){
                abilitiesArray.push(response.abilities[i].ability);
            }
            setPokemonAbilities(abilitiesArray);
            for(var j=0; j< response.types.length;j++){
                typesArray.push(response.types[j].type);
            }
            setPokemonTypes(typesArray);
            setPokeID(response.id);
            let heightpo = response.height /10;
            setPokeHeight(heightpo);
            let weightpo = response.weight/10;
            setPokeWeight(weightpo);
        }) 
        
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

    const front_default = `https://img.pokemondb.net/sprites/home/normal/${props.SearchQuery}.png`;
    const front_shiny = `https://img.pokemondb.net/sprites/home/shiny/${props.SearchQuery}.png`;

    let generationIn = "";
    for (var index =0; index < 900; index++){
        if(pokeID===0 || pokeID <=151){
            generationIn="Kanto";
        }
        else if(pokeID>=152 || pokeID <=251){
            generationIn="Johto";
        }
        else if(pokeID>=252 || pokeID <=386){
            generationIn="Hoenn";
        }
        else if(pokeID>=287 || pokeID <=493){
            generationIn="Sinnoh";
        }
        else if(pokeID>=494 || pokeID <=649){
            generationIn="Unova";
        }
        else if(pokeID>=650 || pokeID <=721){
            generationIn="Kalos";
        }
        else if(pokeID>=722 || pokeID <=809){
            generationIn="Alola";
        }
        else if(pokeID>=810){
            generationIn="Galar";
        }
    }

    const percentage = pokeCaptureRate * 100 / 255 ;
    const percentage_rounded = (Math.round(pokeCaptureRate * 100 / 255).toFixed(0)) ;
    const progressCaptureRate = <ProgressBar now={percentage} style={{width:"50%"}} />
    return (
        <div id="div1">
            <h2  style={{textTransform:"capitalize"}}>{props.SearchQuery}</h2>
            <h5>Index: {JSON.stringify(pokeID)}</h5>
            <h5>Generation: {generationIn}</h5>
            <br/>
            <div style={{display:"flex", flexDirection: 'row', alignItems: "center", justifyContent:"space-evenly"}}>
                <Card className={classes.picRoot} style={{flex: 1}}>
                        <Typography gutterBottom variant="h5" component="h2" style={{textTransform:"capitalize", fontSize:"2.5vh"}}>
                            {props.SearchQuery}'s Normal Form
                        </Typography>
                    <img src={front_default} alt="Pokemon's normal form"/>
                </Card>
                <Card className={classes.picRoot} style={{flex: 1}}>
                        <Typography gutterBottom variant="h5" component="h2" style={{ textTransform:"capitalize", fontSize:"2.5vh"}}>
                            {props.SearchQuery}'s Shiny Form
                        </Typography>
                    <img src={front_shiny} alt="Pokemon's shiny form"/>
                </Card>
            </div>
            <br/>
            <Container>
                <Row md={4} style={{display:"flex", justifyContent: 'center'}}>
                        <div className="card" style={{width: "10rem"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline"}}>
                            Abilities
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh", paddingTop: 5, listStyleType:"none"}}>
                            {pokemonAbilities.map((item,i)=>
                            <li key={i}>{item.name}</li>)}  
                        </Typography>
                    </div>
                    <br/>
                    <div className="card" style={{width: "10rem"}}>
                            <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline"}}>
                            Type
                            </Typography>
                            <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5,listStyleType:"none"}}>
                            {pokemonTypes.map((item,i)=>
                            <li key={i}>{item.name}</li>)}   
                            </Typography>
                    </div>
                    <br/>
                    <div className="card" style={{width: "10rem"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline"}}>
                            Stats
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5}}>
                            Height: {pokeHeight} m
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh"}}>
                            Weight: {pokeWeight} kg
                        </Typography>
                    </div>
                    <br/>
                    <div className="card" style={{width: "10rem"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline"}}>
                            Capture rate
                        </Typography>
                        <div style={{display:"flex", justifyContent: 'center', paddingTop: 10}}>
                        {progressCaptureRate}
                        </div>
                        <div style={{ fontSize:"2vh"}}>{percentage_rounded}%</div>
                    </div> 
                </Row>
        </Container>
        </div>
    );  
}

export default MediaGrid