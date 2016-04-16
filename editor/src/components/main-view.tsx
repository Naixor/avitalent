import 'rc-scroll-anim/assets/index.css';
import * as React from 'react';
import * as ScrollAnim from 'rc-scroll-anim';
import { merge } from 'lodash';

import { ListItem } from '../modules/datastructures';

const {
    Element,
    Link,
    scrollScreen,
    OverPack
} = ScrollAnim;

export class MainView extends React.Component<PropsInf, StateInf> {
    constructor(props) {
        super(props);
        this.props = {
            style: {},
            childViews: []
        }
    }
    renderChildViews(): JSX.Element[] | string {
        if (this.props.childViews && this.props.childViews.length) {
            return this.props.childViews.map((item, key) => {
                let lc = item.link.replace(/\//g, '-');
                return (<Element key={key} className={'pack-page ' + lc} scrollName={lc}>
                            <div>{lc}</div>
                        </Element>)
            });
        }
        return '';
    }
    render() {
        let {
            style
        } = this.props;
        
        return (
            <div style={style}>
                {this.renderChildViews()}
            </div>
        )
    }
}

scrollScreen.init({loop: true});

interface PropsInf {
    style?: Object
    childViews?: ListItem[]
}

interface StateInf {
    
}