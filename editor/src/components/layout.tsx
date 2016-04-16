import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assign } from 'lodash';

export class Layout extends React.Component<PropsInf, StateInf> {
    refs: {
        [key: string]: any
        ele: HTMLDivElement
    }
    style: any
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            eleWidth: 0,
            eleHeight: 0,
            rawAuto: false,
            columnAuto: false
        }
        this.style = assign({}, this.props.style, {position: 'absolute', display: 'inline-block'});
    }
    doLayout() {
        let container = ReactDOM.findDOMNode(this).parentElement;
        let containerSize = container.getBoundingClientRect();
        let eleSize = this.refs.ele.getBoundingClientRect();
        let nextState = {
            left: 0,
            top: 0,
            eleWidth: eleSize.width,
            eleHeight: eleSize.height,
            rawAuto: false,
            columnAuto: false
        };
        switch (this.props.raw) {
            case 'auto':
                nextState.rawAuto = true;
            case 'left':
                nextState.left = 0;
                break;
            case 'center':
                nextState.left = (containerSize.width - eleSize.width) / 2;
                break;
            case 'right':
                nextState.left = containerSize.width - eleSize.width;    
        }
        
        switch (this.props.column) {
            case 'auto':
                nextState.columnAuto = true;
            case 'top':
                nextState.top = 0;
                break;
            case 'center':
                nextState.top = (containerSize.height - eleSize.height) / 2;
                break;
            case 'bottom':
                nextState.top = containerSize.height - eleSize.height;
        }
        this.setState(nextState);
    }
    px(val: number) {
        return val + 'px';
    }
    componentDidMount() {
        window.addEventListener('resize', this.doLayout.bind(this));
        setTimeout(this.doLayout.bind(this), 0);
    }
    render() {
        if (this.state.columnAuto) {
            this.style.height = '100%';
        }
        if (this.state.rawAuto) {
            this.style.width = '100%';        
        }
        this.style.top = this.px(this.state.top);
        this.style.left = this.px(this.state.left);
        const style = assign({}, this.style);
        return (
            <div style={style}>
                <div ref="ele" style={{display: 'inline-block'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

interface PropsInf {
    style?: any
    raw: string
    column: string
}

interface StateInf {
    left: number
    top: number
    eleWidth: number
    eleHeight: number
    rawAuto: boolean
    columnAuto: boolean
}