import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import MediaGrid from './Components/MediaGrid';
import Header from './Components/Header';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userInput, setUserInput] = useState("eevee");

  return (
    <div css={container(darkMode)}>
      <Header onDarkMode={setDarkMode} />
      <SearchBar setUserInput={setUserInput} darkMode={darkMode}/>
      <MediaGrid searchInput={userInput} />
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
