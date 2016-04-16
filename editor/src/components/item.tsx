import * as React from 'react';
import { assign, merge } from 'lodash';
import Radium from 'radium';
import { Styles, ListItem } from 'material-ui';
import { Link } from './navigation-view';
import { ActionFlightTakeoff } from 'material-ui/lib/svg-icons';
import { FlightTakeOffIcon } from './flight-takoff-icon';

const styles = {
    div: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'raw',
        width: '100%',
        textAlign: 'left',
        alignItems: 'center'
    },
    a: {
        fontSize: '15px',
        color: Styles.Colors.white,
        textDecoration: 'none'
    },
    linkStyle: {
        position: 'relative',
        width: '100%',
        height: '100%'
    }
}

export class Item extends React.Component<ItemProps, ItemState> {
    static defaultProps = {
        label: '',
        href: '#',
        disableLink: true,
        location: '',
        showLeftIcon: false,
        play: false
    }
    constructor(props) {
        super(props);
    }
    _onTouchTap(e: React.MouseEvent) {
        !this.props.disableLink && (window.location.href = this.props.href);
        this.props.onTouchTap && this.props.onTouchTap(e);
    }
    render() {
        return (
            <div style={styles.div}  onClick={e => this._onTouchTap(e)}>
                <FlightTakeOffIcon show={this.props.showLeftIcon} play={this.props.play} style={{flex: 'none', margin: '-5px 0 0 10px'}} color={Styles.Colors.blue300}/>
                <Link locator={this.props.location}>
                    <ListItem style={{position: 'relative', flex: 1, width: '100%', marginLeft: '12px'}}
                        touchRippleOpacity={1}
                        touchRippleColor={Styles.Colors.blue100}>
                    
                        <a style={styles.a} href={this.props.href} onClick={e => {e.preventDefault()}}>
                            {this.props.label}
                        </a>
                    </ListItem>
                </Link>
            </div>
        );
    }
}

interface ItemProps {
    style?: any
    label?: any
    href?: string
    disableLink?: boolean
    location?: string
    showLeftIcon?: boolean
    play?: boolean
    onTouchTap?: (e: React.MouseEvent) => void
}

interface ItemState {
}