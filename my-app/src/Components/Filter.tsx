import React, { useCallback, useRef, useState, memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { useOnClickOutside } from '../hooks/useOnClickOutside';
import filterIcon from '../icons/filter.svg';
import filledFilterIcon from '../icons/filledfilter.svg';

interface FilterProps {
    label: string,
    options: string[],
    onSelection: (value: string) => void,
    selectedOptions: string[],
}

interface Props {
    filters: FilterProps[],
}

const Filter = (props: Props) => {
    const containerRef = useRef(null);
    const [showFilters, setShowFilters] = useState(false);

    const handleClickOutside = useCallback(() => {
        setShowFilters(false);
    }, []);

    useOnClickOutside(containerRef, handleClickOutside)
    return (
        <div ref={containerRef} css={containerStyle}>
            <div css={wrapperContainerStyle(showFilters)}>
                <div onClick={() => setShowFilters(true)} css={filterIconContainerStyle}><img src={props.filters.some(filter => filter.selectedOptions.length) ? filledFilterIcon : filterIcon} alt={'filter'} /></div>
                {showFilters && (
                    <div>
                        {props.filters.map((filter, fIndex) => (
                            <div key={fIndex}>
                                <div css={filterLabelStyle}>{filter.label}</div>
                                <div css={optionsContainers}>
                                    {filter.options.map((option, oIndex) => (
                                        <div key={oIndex} css={optionContainerStyle} onClick={() => filter.onSelection(option)}>
                                            <input type="checkbox" value={option} checked={filter.selectedOptions.includes(option)} />
                                            {option}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(Filter);

const containerStyle = css`
    position: relative;
`;

const wrapperContainerStyle = (isExpanded: boolean) => css`
    position: absolute;
    overflow: auto;
    max-height: 300px;
    width: ${isExpanded ? 250 : 50}px;
    border-radius: 4px;
    background: white;
    color: black;
    box-shadow: rgb(0 0 0 / 20%) 1px 1px 10px; 
    transition: 0.2s ease all;
`;

const filterLabelStyle = css`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`;

const optionsContainers = css`
    display: flex;
    flex-direction: column;
`;

const optionContainerStyle = css`
    display: flex;
    align-items: center;
    margin-left: 10px; 

    input {
      margin-right: 15px;  
    }
`;

const filterIconContainerStyle = css`
    min-height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
`;