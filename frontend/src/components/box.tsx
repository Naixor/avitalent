import * as React from 'react';
import * as _ from 'lodash';

interface BoxProps {
    style?: any
    minWidth?: string
    onModeChange?: (BoxState) => void
}

export interface BoxState {
    smallMode: boolean
}

const boxStyle = {
    position: 'absolute',
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden'
}

export class Box extends React.Component<BoxProps, BoxState> {
    private isPhone: boolean;
    private minWidth = 600;
    private preSmallMode = null;
    private onModeChange: (state) => void = () => {};
    constructor(props) {
        super(props);
        let _minWidth = _.parseInt(this.props.minWidth);
        if (!_.isNaN(_minWidth)) {
            this.minWidth = _minWidth;
        }
        this.isPhone = navigator.userAgent.indexOf('Mobile') !== -1;

        this.props.onModeChange && (this.onModeChange = this.props.onModeChange);
        this.state = {smallMode: this.minWidth > window.innerWidth};
    }
    handlerResize() {
        let mode = this.minWidth > window.innerWidth;
        if (mode !== this.preSmallMode) {
            this.setState({smallMode: mode});
            this.onModeChange(this.state);
            this.preSmallMode = mode;
        }
    }
    componentDidMount() {
        if (!this.isPhone) {
            window.addEventListener('resize', this.handlerResize.bind(this));
            this.onModeChange(this.state);
        } else {
            this.setState({smallMode: true});
            this.onModeChange({smallMode: true});
        }
    }
    componentWillUnmount() {
        !this.isPhone && window.removeEventListener('resize', this.handlerResize);
    }
    render() {
        let _boxStyle = _.merge(boxStyle, this.props.style);
        return (
            <div style={_boxStyle} className="box">
                {this.props.children}
            </div>
        );
    }
};