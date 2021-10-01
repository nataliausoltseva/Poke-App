import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Typography, makeStyles, Card,  createStyles, Theme, createMuiTheme, responsiveFontSizes, List, Paper } from '@material-ui/core';
import pluralise from 'pluralize';

interface Abilities {
    name: string;
    url: string;
}
interface Types {
    name: string;
    url: string;
}
interface Moves {
    name: string;
    url: string;
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
    const [pokemonMoves, setPokemonMoves] = useState<Moves[]>([{name:"", url:""}])
    const [pokemonTypes, setPokemonTypes] = useState<Types[]>([{name:"", url:""}])
    const [pokeID, setPokeID] = useState(0);
    const [pokeWeight, setPokeWeight] = useState(0);
    const [pokeHeight, setPokeHeight] = useState(0);
    const [pokeCaptureRate, setPokeCaptureRate] = useState(0);

    const [movesPageIndex, setMovesPageIndex] = useState(0);

    let abilitiesArray: any[] = [];
    const typesArray: any[] = [];
    let movesArray: any[] = [];
    
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
            
            for(var i=0; i< response.moves.length; i++){
                movesArray.push(response.moves[i].move);
            }
            setPokemonMoves(movesArray);
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

    const onPrevPage = () => {
        if (movesPageIndex){
            setMovesPageIndex(prev => prev - 1);
        }
    };

    const onNextPage = () => {
        if (((movesPageIndex + 1) * 4) < pokemonMoves.length) {
            setMovesPageIndex(prev => prev + 1);
        }
    }

    return (
        <div id="div1" style={{ marginLeft: '10px'}}>
           <div style={{textAlign:'left'}}>
                 <h2  style={{textTransform:"capitalize"}}>{props.SearchQuery}</h2>
                <h5>Index: {JSON.stringify(pokeID)}</h5>
                <h5>Generation: {generationIn}</h5>
                <br/>
           </div>
            <div style={{display: "flex"}}>
                <div style={{display:"flex", flexDirection: 'column', alignItems: "center", justifyContent:"space-evenly", marginRight: "2em"}}>
                    <Card className={classes.picRoot} style={{flex: 1}}>
                            <Typography gutterBottom variant="h5" component="h2" style={{textTransform:"capitalize", fontSize:"2.5vh"}}>
                                {props.SearchQuery}'s Normal Form
                            </Typography>
                        <img src={front_default} alt="Pokemon's normal form"/>
                    </Card>
                    <br/>
                    <Card className={classes.picRoot} style={{flex: 1}}>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textTransform:"capitalize", fontSize:"2.5vh"}}>
                                {props.SearchQuery}'s Shiny Form
                            </Typography>
                        <img src={front_shiny} alt="Pokemon's shiny form"/>
                    </Card>
                </div>
                <br/>
                <div style={{width: "100%"}}>
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline", marginRight: "10px"}}>
                            {pluralise('Ability', pokemonAbilities.length)}:
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh", paddingTop: 5, listStyleType:"none", display: 'flex'}}>
                            {pokemonAbilities.map((item,i)=>
                                <div key={i} style={{marginRight: "10px"}}>{i === pokemonAbilities.length - 1 ? item.name : `${item.name},`}</div>)}  
                        </Typography>
                    </div>
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline", marginRight: "10px"}}>
                        {pluralise('Type', pokemonTypes.length)}:
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5,listStyleType:"none", display: 'flex',}}>
                            {pokemonTypes.map((item,i)=>
                               <div key={i} style={{marginRight: "10px"}}>{i === pokemonTypes.length - 1 ? item.name : `${item.name},`}</div>)}  
                        </Typography>
                    </div>
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline", marginRight: "10px"}}>
                            Height:
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5}}>
                            {pokeHeight} m
                        </Typography>
                       
                    </div>
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline", marginRight: "10px"}}>
                            Weight:
                        </Typography>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh"}}>
                            {pokeWeight} kg
                        </Typography>
                    
                    </div>
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline",  marginRight: "10px"}}>
                            Capture rate:
                        </Typography>
                        <div style={{display:"flex", justifyContent: 'left', paddingTop: 10, width: '30%'}}>
                            {progressCaptureRate}
                        </div>
                        <div style={{ fontSize:"2vh", marginLeft: '-10%'}}>{percentage_rounded}%</div>
                    </div> 
                    <div style={{display: "flex", width: "100%"}}>
                        <Typography variant="h5" component="h2" style={{ fontSize:"2.5vh", textDecoration:"underline", marginRight: "10px"}}>
                            {pluralise('Move', pokemonMoves.length)}:
                        </Typography>
                        <div onClick={onPrevPage} style={{height: '40px', width: '40px', fontSize: '24px', background: 'aliceblue', borderRadius: '50%', textAlign:'center', cursor: 'pointer', marginRight: '10px'}}>{"<"}</div>
                        <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5,listStyleType:"none", display: 'flex',}}>
                            {pokemonMoves.map((item,i)=> (
                                i >= movesPageIndex * 4 && i <= (movesPageIndex + 1) * 4 && (
                                    <div key={i} style={{marginRight: "10px"}}>
                                        {i === pokemonTypes.length - 1 ? item.name : `${item.name},`}
                                    </div>
                                )
                            ))}

                        </Typography>
                        <div onClick={onNextPage} style={{height: '40px', width: '40px', fontSize: '24px', background: 'aliceblue', borderRadius: '50%', textAlign:'center', cursor: 'pointer'}}>{">"}</div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default MediaGrid