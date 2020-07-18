# Poke-App

The web-app can be accessed by: [Pokemon's Info](https://pokeapp-nu.azurewebsites.net/)

## How app looks like:
#### Main Page
![main page](https://user-images.githubusercontent.com/26496834/87839433-e6501100-c8ee-11ea-84a9-5c9bd98e4175.PNG)

#### Drop down menu for search bar
![dropdown menu](https://user-images.githubusercontent.com/26496834/87839466-113a6500-c8ef-11ea-86e7-010f3daf2635.PNG)

#### Drop down menu when a user types some of the pokemon's name
![dropdown menu with suggestions](https://user-images.githubusercontent.com/26496834/87839474-1992a000-c8ef-11ea-959f-2408ed114d42.PNG)


## What this web-app is going to do: 
-  A user is going to be able to enter a name of a pokemon (Not including the most recent pokemons that appear in Generation VII:Alola (some of them) and VIII:Galar)
- The app will return all important information about that pokemon such as being to see the difference between normal and shiny form of the selected pokemon, abilities, types and see from what generation with index it comes from.

## What this app involves:
- TypeScript React
- REST API for pokemons - [PokeAPI](https://pokeapi.co/)
- Pokemon images were taken from -[Pokemon Database](https://pokemondb.net/sprites/). Since this provides a better quality for them than in the API address.

## How to install this app:
- clone the repo
- navigate to the root directory
- enter `npm install` in a new terminal window

Once the *node_modules* folder has been created and all the dependencies have been successfully installed. 

Run `npm run start` which will compile the project and allow you to view the app locally.

Note: The project has already been set up with a live reloader. This will compile and reload the web page on your localhost port automatically when you save any file in the project. Therefore, you will NOT have to run `npm run start` every time.
