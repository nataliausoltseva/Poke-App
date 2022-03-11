import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface Props {
    filteredSuggestions: string[],
    onSelection: (value: React.MouseEvent) => void,
}

const SuggestionList = (props: Props) => {

    return (
        <div>
            {props.filteredSuggestions.map((suggestion, index) => (
                <div key={`s-${index}`} onClick={props.onSelection} css={suggestionStyle}>
                    {suggestion}
                </div>
            ))}
        </div>
    )
}

export default SuggestionList;

const suggestionStyle = css`
    cursor: pointer;

    :hover {
        background-color: #008f68;
        color: #fae042;
        cursor: pointer;
        font-weight: 700;
    }
`;