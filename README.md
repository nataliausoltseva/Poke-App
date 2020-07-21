# Poke-App

The web-app can be accessed by: [Pokemon's Info](https://pokeapp-nu.azurewebsites.net/)

## How app looks like:
#### Main Page
![main page](https://user-images.githubusercontent.com/26496834/87839433-e6501100-c8ee-11ea-84a9-5c9bd98e4175.PNG)

#### Drop down menu for search bar
![dropdown menu](https://user-images.githubusercontent.com/26496834/87839466-113a6500-c8ef-11ea-86e7-010f3daf2635.PNG)

#### Drop down menu when a user types some of the pokemon's name
![dropdown menu with suggestions](https://user-images.githubusercontent.com/26496834/87839474-1992a000-c8ef-11ea-959f-2408ed114d42.PNG)

## Description of build and release pipelines:
Both build and release pipelines are continous on a new commit to `master` branch. This means that every time when a new commit is made to the branch, a new build will start proceding and when the build is finished then a new release is created.

#### Build Pipeline ####
- To make it work only on the commit to `master` it is specified in the `trigger` such as 
```yml
trigger:
- master
```
- Variables are used to make the code more clear since we only need to define the varibale once by adding hard-coded values directly and then we can use that multiple times in other commands.
- `pool` specifies which pool to use for the job of the pipeline i.e. it shows the version of it but also holds the information about the job's strategy.
- The steps show the sequence which is going to be followed to make up a job. Each step runs on their own with acces to the pipeline workspace.
  - Task is used to reference to a building block of a pipline including the version of it. In this app, there are 3 tasks:
    - `NodeTool@0` that will install the `Node.js` version of `10.x`
    - `ArchiveFiles@2` where the `buildDir` is added to the archive. Since the root folder is not selcted i.e. `includeRootFolder: False`, then the root folder name will not be prefixed to the file path within the achieve. It uses the `zip` as an achieve type. `ArchieveFile` contains a specific name of the archieve file that is going to be created. `replaceExistingArchive` shows that if any existing archive exists already then it would overwrite it.
    - `PublishBuildArtifacts@1` where the `pathToPublish` specifies the folder/file path to be published. `ArtifactName` is just a name of the artifact that created. `publishLocation` tells where to store that atifact in the Azre Pipelines.
  - Script is a just a shortcut for the command line task in this case it going to the `rootDir` following by npm install and build.
  
#### Release Pipeline ####
It deploys the artifacts that are produced by the Azure Pipeline build for this app (CI build). The CD release pipeline was defined by using a stage that is defined by a job and a task. Foir this app the template of the Deploy Azure App Service. This results in the deployment of the artifacts into the Azure web-site (web-app).

## How to use this app: 
- Enter a name of a pokemon (Not including the most recent pokemons that appear in Generation VII:Alola (some of them) and VIII:Galar)
- The app returns all important information about that pokemon such as being to see the difference between normal and shiny form of the selected pokemon, abilities, types and see from what generation with index it comes from.

## What this app involves:
- TypeScript React
- REST API for pokemons - [PokeAPI](https://pokeapi.co/)
- Pokemon images were taken from -[Pokemon Database](https://pokemondb.net/sprites/). Since this provides a better quality for them than in the API address.
- Deployment using Azure pipelines

## How to install this app:
- clone the repo
- navigate to the root directory
- enter `npm install` in a new terminal window

Once the *node_modules* folder has been created and all the dependencies have been successfully installed. 

Run `npm run start` which will compile the project and allow you to view the app locally.

Note: The project has already been set up with a live reloader. This will compile and reload the web page on your localhost port automatically when you save any file in the project. Therefore, you will NOT have to run `npm run start` every time.
