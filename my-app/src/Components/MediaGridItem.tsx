import React, { memo, useMemo, useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import pluralise from 'pluralize';

import chevronIcon from '../icons/chevron.svg';

interface ItemProps {
    header: string,
    options: string[],
    usePagination?: boolean,
}

interface Props {
    items: ItemProps[]
}

const MediaGridItem = (props: Props) => {
    const [pageIndex, setPageIndex] = useState(0);
    return (
        !!props.items.length ? (
            <div>
                {props.items.map((item, itemIndex) => (
                    <div key={Math.random()} css={statsItemWrapperStyle}>
                        <div css={headerStyle}>
                            {pluralise(item.header, item.options.length)}:
                        </div>
                        <div css={statsListContainerStyle}>
                            {item.usePagination && pageIndex * 10 >= 10 && (
                                <div onClick={() => setPageIndex(prevState => prevState - 1)}><img src={chevronIcon} css={chevronIconStyle()} /></div>
                            )}
                            {item.usePagination ?
                                item.options.slice(pageIndex * 10, (pageIndex + 1) * 10).map((option, i) =>
                                    <div key={i} css={statsItemStyle}>{i === item.options.slice(pageIndex * 10, (pageIndex + 1) * 10).length - 1 ? option : `${option},`}</div>
                                ) : 
                                item.options.map((option, i) =>
                                <div key={i} css={statsItemStyle}>{i === item.options.length - 1 ? option : `${option},`}</div>
                            ) 
                            }
                            {item.usePagination && (
                                <div onClick={() => setPageIndex(prevState => prevState + 1)}><img src={chevronIcon} css={chevronIconStyle(true)} /></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <React.Fragment />
        )
    )
};

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

const chevronIconStyle = (isNext: boolean = false) => css`
    transform: rotate(${isNext && '-'}90deg);
`