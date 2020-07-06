import React, { useState } from 'react';
import SearchBar from './Components/SearchBarComponent/SearchBar';
import './App.css';
import { IUserInput } from './Common/interfaces';
import MediaGrid from './Components/MediaGridComponent/MediaGrid';

function App() {
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "eevee",
    
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }
  return (
    <div className="App">
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)}/>
      <MediaGrid SearchQuery={UserInput.SearchQuery}/>
    </div>
  );
}

export default App;
