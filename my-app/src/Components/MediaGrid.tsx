import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { makeStyles, createStyles, Theme, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import pluralise from 'pluralize';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

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
    const progressCaptureRate = <ProgressBar now={percentage} css={extraStyleProgressBarStyle} />

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
        <div id="div1" css={containerStyle}>
           <div css={pokemonNameContainerStyle}>
                <h2 css={pokemonNameStyle}>{props.SearchQuery}</h2>
                <h5>Index: {JSON.stringify(pokeID)}</h5>
                <h5>Generation: {generationIn}</h5>
           </div>
            <div css={pokemonInfoWrapperStyle}>
                <div css={imageCardsContainerStyle}>
                    <img src={front_default} alt="Pokemon's normal form"/>
                    <div  css={cardHeaderStyle}>
                        {props.SearchQuery}'s Normal Form
                    </div>
                    <br/>
                    <img src={front_shiny} alt="Pokemon's shiny form"/>
                    <div css={cardHeaderStyle}>
                        {props.SearchQuery}'s Shiny Form
                    </div>        
                </div>
                <br/>
                <div css={statsContainerStyle}>
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            {pluralise('Ability', pokemonAbilities.length)}:
                        </div>
                        <div css={statsListContainerStyle}>
                            {pokemonAbilities.map((item,i)=>
                                <div key={i} css={statsItemStyle}>{i === pokemonAbilities.length - 1 ? item.name : `${item.name},`}</div>)}  
                        </div>
                    </div>
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                        {pluralise('Type', pokemonTypes.length)}:
                        </div>
                        <div css={statsListContainerStyle}>
                            {pokemonTypes.map((item,i)=>
                               <div key={i} css={statsItemStyle}>{i === pokemonTypes.length - 1 ? item.name : `${item.name},`}</div>)}  
                        </div>
                    </div>
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            Height:
                        </div>
                        <div css={statsListContainerStyle}>
                            {pokeHeight} m
                        </div>
                       
                    </div>
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            Weight:
                        </div>
                        <div css={statsListContainerStyle}>
                            {pokeWeight} kg
                        </div>
                    
                    </div>
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            Capture rate:
                        </div>
                        <div css={progressBarStyle} >
                            {progressCaptureRate}
                        </div>
                        <div css={progressBarLabelStyle}>{percentage_rounded}%</div>
                    </div> 
                    <div css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            {pluralise('Move', pokemonMoves.length)}:
                        </div>
                        <div onClick={onPrevPage} css={arrowStyle}>{"<"}</div>
                        <div css={statsListContainerStyle}>
                            {pokemonMoves.map((item,i)=> (
                                i >= movesPageIndex * 4 && i <= (movesPageIndex + 1) * 4 && (
                                    <div key={i} css={statsItemStyle}>
                                        {i === pokemonTypes.length - 1 ? item.name : `${item.name},`}
                                    </div>
                                )
                            ))}

                        </div>
                        <div onClick={onNextPage} css={arrowStyle}>{">"}</div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default MediaGrid

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
    width: 100%;
`;

const statsItemWrapperStyle = css`
    display: flex;
    width: 100%;
`;

const headerStyle = css`
    font-size: 2.5vh;
    text-decoration: underline;
    margin-right: 10px;
`;

const statsListContainerStyle = css`
    font-size: 2vh;
    padding-top: 5px;
    display: flex;
`;

const statsItemStyle = css`
    margin-right: 10px;
`;

const arrowStyle = css`
    height: 40px;
    width: 40px;
    font-size: 24px;
    background: 'aliceblue';
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
`;

const progressBarStyle = css`
    display: flex;
    justify-content: left;
    padding-top: 10px;
    width: 30%;
`;

const progressBarLabelStyle = css`
    font-size: 2vh;
    margin-left: -10%;
`;

const extraStyleProgressBarStyle = css`
    width: 50%;
`;