/* tslint:disable */

import * as React from 'react';
import { MenuItem, Card, CardHeader, CardTitle, CardMedia, Divider, Styles } from 'material-ui';
import Radium from 'radium';
import { merge, assign, extend } from 'lodash';
import { ShortScrollView } from './short-scroll-view';
import { ListItem } from '../modules/datastructures';
import { Item } from './item';
import { NavigationViewEvent } from './navigation-view';

let ContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
}

const CardStyle = {
    flex: 'none',
    margin: '0 30px 10px 30px',
    backgroundColor: Styles.Colors.transparent
}

const CardTitleStyle = {
    color: Styles.Colors.white,
    fontSize: '17px',
    textAlign: 'center',
    marginTop: '30px',
    lineHeight: '1.5em'
}

const AStyle = {
    default: {
        color: Styles.Colors.white,
    },
    hover: {
        color: Styles.Colors.blueA400
    }
}

const ScrollViewStyle = {
    width: '100%',
    height: '100%',
    flex: 1
}

export class AviLeft extends React.Component<AviLeftProps, AviLeftState> {
    constructor(props) {
        super(props);
        this.state = {
            linkHover: false,
            activeItem: -1
        }
        NavigationViewEvent.on('backScrollTo', this.onViewScrollHandler.bind(this));
    }
    componentWillUnMount() {
        NavigationViewEvent.off('backScrollTo', this.onViewScrollHandler);
    }
    onViewScrollHandler(idx: number) {
        let state: any = assign({}, this.state, {activeItem: idx-1});        
        this.setState(state);
    }
    itemTapHandler(idx: number, e) {
        let state: any = assign({}, this.state, {activeItem: idx});
        this.setState(state);
    }
    isItemShowleftIcon(idx) {
        return this.state.activeItem === idx;
    }
    renderItems(): any {
        if (this.props.items && this.props.items.length) {
            return this.props.items.map((item, key) => {
                return (<Item key={key+1} label={item.tag} href={item.link} location={item.link} disableLink={true}
                            play={true}
                            showLeftIcon={this.isItemShowleftIcon.call(this, key)}
                            onTouchTap={this.itemTapHandler.bind(this, key)}/>);
            });
        }
        return '';
    }
    aMouseLeave(e) {
        let state: any = assign({}, this.state, {linkHover: false});
        this.setState(state);
    }
    aMouseEnter(e) {
        let state: any = assign({}, this.state, {linkHover: true});
        this.setState(state);
    }
    render() {
        const containerStyle = assign({}, ContainerStyle, this.props.style);
        return (
            <div style={containerStyle}>
                <Card style={CardStyle}>
                    <CardMedia>
                        <img src={this.props.card.logoSrc} alt={this.props.card.logoAlt}/>
                    </CardMedia>
                    <p style={CardTitleStyle}>{this.props.card.title}</p>
                    <p style={CardTitleStyle}>
                        <a href={'http://' + this.props.card.logoAlt} style={this.state.linkHover ? AStyle.hover : AStyle.default} onMouseLeave={this.aMouseLeave.bind(this)} onMouseEnter={this.aMouseEnter.bind(this)}>{this.props.card.logoAlt}</a>
                    </p>
                </Card>
                <Divider style={{flex: 'none'}}/>
                <ShortScrollView style={ScrollViewStyle}>
                    {this.renderItems()}
                </ShortScrollView>
            </div>
        );
    }
}

interface AviLeftProps {
    items: ListItem[]
    style?: any
    card: {
        title: string
        logoSrc: string
        logoAlt: string
    }
}

interface AviLeftState {
    linkHover: boolean
    activeItem?: number
}