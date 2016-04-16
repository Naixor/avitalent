import * as React from 'react';
import { LeftNav, MenuItem, Styles, Divider, ListItem } from 'material-ui';
import { ListItem as ListItemInterface } from '../modules/datastructures';
import { ShortScrollView } from './short-scroll-view';
import { Link } from './navigation-view';
import Radium from 'radium';

const ScrollViewStyle = {
    width: '100%',
    height: '100%'
}

const ItemStyle = {
    display: 'inline-block',
    overflowX: 'hidden',
    width: '100%',
    color: Styles.Colors.fullWhite,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    textDecoration: 'none',
    ':hover': {
        backgroundColor: Styles.Colors.darkWhite
    },
    ':avtive': {
        backgroundColor: Styles.Colors.grey600
    }
}

@Styles.ThemeDecorator(Styles.getMuiTheme(Styles.DarkRawTheme))
export class AviLeftNav extends React.Component<AviLeftNavProps, AviLeftNavState> {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        }
    }
    itemTouchTap() {
        this.setState({open: false});
        this.props.onRequestChange(false);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }
    renderItems(): any {
        let len = 0;
        if (this.props.items && (len = this.props.items.length)) {
            return this.props.items.map((item, key) => {
                return (
                    <Link key={key} locator={item.link}>
                        <ListItem touchRippleColor={Styles.Colors.blue100} touchRippleOpacity={1} onTouchTap={this.itemTouchTap.bind(this)}>
                            <a href={item.link} className='leftItemA' onClick={e => e.preventDefault()}>{item.tag}</a>
                        </ListItem>
                        {len !== key+1 ? <Divider/> : ''}
                    </Link>
                );
            });
        }
        return '';
    }
    render() {
        return (
            <LeftNav open={this.state.open} docked={false} style={this.props.style} onRequestChange={this.props.onRequestChange} overlayStyle={{background: 'rgba(0,0,0,0)'}}>
                <ShortScrollView style={ScrollViewStyle}>
                    {this.renderItems()}
                </ShortScrollView>
            </LeftNav>
        );
    }
}

interface AviLeftNavProps {
    open?: boolean
    style?: any
    items?: ListItemInterface[],
    onRequestChange?: (open: boolean) => any
}

interface AviLeftNavState {
    open: boolean
}