import React, { useMemo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface Props {
    percentage: number,
    header: string,
}

type colourOptions = {
    [key: string]: string
}

const PROGRESS_COLOURS: colourOptions = {
    0: "#9ecbf599",
    20: "#9ecae1",
    40: "#6baed6",
    60: "#3182bd",
    80: "#08519c",
}

const ProgressBar = (props: Props) => {
    const colour = useMemo(() => {
        let colour = '';
        Object.keys(PROGRESS_COLOURS).forEach(key => {
            if (parseInt(key) < props.percentage) {
                colour = PROGRESS_COLOURS[key];
            }
        });
        return colour;
    }, [props]);

    return (
        <div>
            <div css={headerStyle}>
                {props.header}
            </div>
            <div css={containerStyle}>
                <div css={fillerStyle(props.percentage, colour)}>
                    <span css={labelStyle}>{props.percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;

const containerStyle = css`
    height: 20;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 50;
    margin: 50;
`;

const headerStyle = css`
    font-size: 2.5vh;
    text-decoration: underline;
    margin-right: 10px;
`;

const fillerStyle = (percentage: number, colour: string) => css`
    height: 100%;
    width: ${percentage}%;
    background-color: ${colour};
    border-radius: inherit;
    text-align: right;

    transition: width 1s ease-in-out,
`;

const labelStyle = css`
    padding: 5;
    color: white;
    font-weight: bold;
`;
