import * as React from 'react';
import { merge } from 'lodash';

export class FlightTakeOffIcon extends React.Component<PropsInf, StateInf> {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            style,
            color,
            show
        } = this.props;
        style = merge(style, {width: '24px', height: '24px'});
        color = color || 'black';
        let paths = [
            <path key={1} className='airplane' fill={color} d="M2.5 19m19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path>,
            <path key={2} className='land' fill={color} d="M2.5 19h19v2h-19z"></path>
        ];

        return (
            <svg style={style} viewBox="0 0 24 24">
                {show ? paths : ''}
            </svg>
        )
    }
}

// <animateTransform attributeName="transform" begin="0s" dur="3s" type="rotate" from="15 -15 15" to="0 0 0" repeatCount="1"></animateTransform>

interface PropsInf {
    style?: {}
    color?: string
    show?: boolean
    play?: boolean
}

interface StateInf {
    
}