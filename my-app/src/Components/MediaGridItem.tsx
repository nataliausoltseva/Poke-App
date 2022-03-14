import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import pluralise from 'pluralize';

interface Props {
    header: string,
    items: string[],
}

const MediaGridItem = (props: Props) => {
    return (
        <div css={statsItemWrapperStyle}>
            <div css={headerStyle}>
                {pluralise(props.header, props.items.length)}:
            </div>
            <div css={statsListContainerStyle}>
                {props.items.map((item,i)=>
                    <div key={i} css={statsItemStyle}>{i === props.items.length - 1 ? item : `${item},`}</div>)}  
            </div>
        </div>
    )
};

export default MediaGridItem;

const statsItemWrapperStyle = css`
    display: flex;
    width: 100%;
`;

const headerStyle = css`
    font-size: 2.5vh;
    text-decoration: underline;
    margin-right: 10px;
`;

const statsListContainerStyle = css`
    font-size: 2vh;
    padding-top: 5px;
    display: flex;
    flex-wrap: wrap;
`;

const statsItemStyle = css`
    margin-right: 10px;
    white-space: nowrap;
`;