import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface Props {
    children: React.ReactNode
}

const TopBar = (props: Props) => (
    <div css={containerStyle}>
        {props.children}
    </div>
);

export default TopBar;

const containerStyle = css`
    display: flex;
    position: relative;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    box-shadow: 0px 2px 4px -1px #00000033, 0px 4px 5px 0px #00000014, 0px 1px 10px 0px #00000012;
    color: black;
`;