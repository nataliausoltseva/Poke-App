
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const Loading = () => {
    return (
        <div css={styles}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading;

const styles = css`    .lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

 div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;

    :after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    }
`;