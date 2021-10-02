import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import { IUserInput } from './Common/interfaces';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "eevee",
    
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);    
  }

  return (
    <div css={container(darkMode)}>
      <Header onDarkMode={setDarkMode} />
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)} darkMode={darkMode}/>
      <MediaGrid SearchQuery={UserInput.SearchQuery}/>
    </div>
  );
}

export default App;

const container = (darkMode: boolean) => css`
text-align: center;
  ${darkMode && css`
    background: #5a4f7c;
    color: white;
  `};
`;
