import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function Header() {
  return (
    <div className="App">
        <AppBar position='static' color='inherit'>
            <ToolBar>
                <div css={topBarStyle}>
                    Pokemon's information from Generations I-VII 
                </div>
            </ToolBar>
      </AppBar>
    </div>
  );
}

export default Header;

const topBarStyle = css`
  font-size: 3vh;
`;