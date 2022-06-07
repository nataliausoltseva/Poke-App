import React, { memo, useCallback, useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Tooltip } from 'react-tippy';

import TopBar from './TopBar';
import pokeball from '../icons/pokeball.svg';
import Moon from '../icons/moon.svg';
import Sun from '../icons/sun.svg';

interface Props {
  onDarkMode: (value: boolean) => void;
  onPokedox: (value: boolean) => void;
  isListView: boolean;
  isLoading: boolean;
}

const Header = (props: Props) => {
  const [darkModeSwitch, setDarkModeSwitch] = useState(window.localStorage?.pokeDarkMode ? true : false);

  const handleSwitch = useCallback(() => {
    setDarkModeSwitch(prev => !prev);
  }, []);

  useEffect(() => {
    if (darkModeSwitch && !window.localStorage?.pokeDarkMode) {
      localStorage.setItem('pokeDarkMode', "true");
    } else if (!darkModeSwitch) {
      localStorage.removeItem("pokeDarkMode");
    }

    props.onDarkMode(darkModeSwitch);

  }, [darkModeSwitch, props]);

  useEffect(() => {
    if (window.localStorage?.pokeDarkMode) {
      setDarkModeSwitch(true);
    }
  }, []);

  return (
    <div css={appBarStyles(darkModeSwitch)}>
      <TopBar>
        <Tooltip title="Toggle Views" position="bottom"><img src={pokeball} onClick={() => props.onPokedox(!props.isListView)} /></Tooltip>
        <div css={switcherContaineryStyle} onClick={handleSwitch}>
          <input type="checkbox" css={checkboxStyle} />
          <span css={sliderStyle(darkModeSwitch)} />
          {!props.isLoading && (
            <div css={lightModeIconStyle(darkModeSwitch)}>
              <img src={darkModeSwitch ? Moon : Sun} css={iconStyle(darkModeSwitch)} alt={'darkmodeSwitch'} />
            </div>
          )}
        </div>
      </TopBar>
    </div>
  );
}

export default memo(Header);

const appBarStyles = (darkModeSwitch: boolean) => css`
  position: static;
  width: 100%;
  display: flex;
  z-index: 1100;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  box-shadow: 0px 2px 4px -1px #00000033, 0px 4px 5px 0px #00000014, 0px 1px 10px 0px #00000012;
  ${darkModeSwitch && css`
    color: white;
    background-color: #5a4f7c !important;
  `};
`;

const switcherContaineryStyle = css`
  position: absolute;
  right: 0;
  margin-right: 2em;
  width: 60px;
  height: 34px;
`;

const checkboxStyle = css`
  opacity: 0;
  width: 0;
  height: 0;

  :focus {
    box-shadow: 0 0 1px #2196F3;
  }
`;

const sliderStyle = (darkModeSwitch: boolean) => css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: wheat;
  transition: .4s;
  border-radius: 34px;

  ${darkModeSwitch && css`
    background-color: #6f74d4;
  `};

  ::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;

    ${darkModeSwitch && css`
      transform: translateX(26px);
    `};
  }
`;

const lightModeIconStyle = (darkModeSwitch: boolean) => css`
  position: absolute;

  ${darkModeSwitch ? css`
    top: 6px;
    left: 10px;
    transform:  rotate(324deg);
  ` : css`
    top: 3.5px;
    left: 34px;

  `};
`;

const iconStyle = (darkModeSwitch: boolean) => css`
  ${darkModeSwitch ? css`
    width: 10px;
    height: auto;
  ` : css`
    width: 20px;
    height: auto;
  `};

`;