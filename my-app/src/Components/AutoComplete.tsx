import React, { useCallback, useContext, useRef, useState } from "react";
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import SuggestionList from "./SuggestionsList";
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import closeIcon from '../icons/close.svg';
import chevronIcon from '../icons/chevron.svg';

interface Props {
    options: string[],
    onSelection: (value: string) => void,
    placeholder: string,
    darkMode: boolean,
}

const AutoComplete = (props: Props) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState('');

    const suggestionsRef = useRef(null);

    const onChange = useCallback((event) => {
        const userInput = event.target.value;

        const unLinked = props.options.filter(option =>
            option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setInput(event.target.value);
        setFilteredSuggestions(unLinked);
        setShowSuggestions(true);

        props.onSelection(event.target.value);
    }, [props.options]);

    const onClick = useCallback((event) => {
        if (!input) {
            setFilteredSuggestions(props.options);
        } else {
            const unLinked = props.options.filter(option =>
                option.toLowerCase().indexOf(input.toLowerCase()) > -1
            );
            setFilteredSuggestions(unLinked);
        }
        setShowSuggestions(true);
    }, [props.options]);

    const onOptionSelection = useCallback((event) => {
        setInput(event.target.innerText);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        props.onSelection(event.target.innerText);
    }, []);

    const handleClickOutside = useCallback(() => {
        setShowSuggestions(false);
    }, []);

    const clearInput = useCallback(() => {
        setInput('');
        setFilteredSuggestions(props.options);
        props.onSelection('');
    }, [props.options]);

    useOnClickOutside(suggestionsRef, handleClickOutside)

    return (
        <div ref={suggestionsRef} css={containerStyle}>
            <input
                type="text"
                onChange={onChange}
                onClick={onClick}
                value={input}
                css={inputStyle(showSuggestions, props.darkMode)}
            />
            <span css={placeholderStyle(showSuggestions, !!input)}>{props.placeholder}</span>
            <img src={closeIcon} css={closeIconStyle(showSuggestions)} onClick={clearInput} />
            <img src={chevronIcon} css={chevronIconStyle(showSuggestions)} />
            {showSuggestions && (
                filteredSuggestions.length ? (
                    <div css={suggestionsContainerStyle}>
                        <SuggestionList
                            filteredSuggestions={filteredSuggestions}
                            onSelection={onOptionSelection}
                        />
                    </div>
                ) : (
                    <div css={emptySuggestionsContainerStyle}>
                        No suggestions are available.
                    </div>
                )
            )}
        </div>
    )
}

export default AutoComplete;

const containerStyle = css`
    position: relative;
`;

const suggestionsContainerStyle = css`
    position: absolute;
    overflow: auto;
    max-height: 300px;
    min-height: 45px;
    width: 200px;
    padding-top: 10px;
    border-radius: 4px;
    background: white;
    color: black;
    box-shadow: rgb(0 0 0 / 20%) 1px 1px 10px; 
`;

const inputStyle = (hasFocus: boolean, isDarkMode: boolean) => css`
    padding: 9px;
    border-radius: 4px;
    border: none;

    :focus {
        padding-top: 15px;
    }
    
    :focus-visible {
        border: #0000ff9c 2px solid;
        outline: none;
    }

    ${!isDarkMode && css`
        border: grey 2px solid;
    `}
`;

const placeholderStyle = (hasFocus: boolean, isHidden: boolean) => css`
    position: absolute;
    left: 0;

    pointer-events: none;
    transition: 0.2s ease all;
    color: black;

    ${hasFocus ? css`
        position: absolute;
        left: 5px;
        top: 0;
        font-size: 12px;

    ` : css`
        padding: 10px; 
        ${isHidden && css`
            opacity: 0;    
        `}   
    `}
`;

const closeIconStyle = (hasInput: boolean) => css`
    position: absolute;
    margin-left: -45px;
    top: 16px;
    width: 20px;
    pointer-events: none;
    ${hasInput ? css`
        pointer-events: all;
    ` : css`
        visibility: hidden;
    `}
`;

const chevronIconStyle = (isExpanded: boolean) => css`
    position: absolute;
    margin-left: -25px;
    top: 11px;
    pointer-events: none;
    transition: 0.2s ease all;


    ${isExpanded && css`
        transform: rotate(180deg);
        top: 14px;
    `}
`;

const emptySuggestionsContainerStyle = css`
    position: absolute;
    margin-left: 12px;
    font-size: 14px;
`;
