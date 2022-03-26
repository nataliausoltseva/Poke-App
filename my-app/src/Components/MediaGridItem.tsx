import React, { memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import pluralise from 'pluralize';

interface ItemProps {
    header: string,
    options: string[],
}

interface Props {
    items: ItemProps[]
}

const MediaGridItem = (props: Props) => (
    !!props.items.length ? (
        <div>
            {props.items.map((item, itemIndex) => (
                <div key={itemIndex} css={statsItemWrapperStyle}>
                    <div css={headerStyle}>
                        {pluralise(item.header, item.options.length)}:
                    </div>
                    <div css={statsListContainerStyle}>
                        {item.options.map((option, i) =>
                            <div key={i} css={statsItemStyle}>{i === item.options.length - 1 ? option : `${option},`}</div>)}
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <React.Fragment />
    )
);

export default memo(MediaGridItem);

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