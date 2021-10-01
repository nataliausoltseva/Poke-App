import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import { IUserInput } from './Common/interfaces';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function App() {
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "eevee",
    
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }
  return (
    <div css={container}>
      <Header/>
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)}/>
      <MediaGrid SearchQuery={UserInput.SearchQuery}/>
    </div>
  );
}

export default App;

const container = css`
  text-align: center;
`;
