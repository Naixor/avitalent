import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { ScrollLockMixin } from '../modules/utils/scroll-lock-mixin';
import { merge } from 'lodash';

const SsvStyle = {
    overflowY: 'scroll',
    overflowX: 'hidden'
}

export var ShortScrollView = React.createClass({
    // mixins: [ScrollLockMixin.prototype],
    displayName: 'ShortScrollView',
    getDefaultProps: function() {
        return {
            style: {}
        }
    },
    getDefaultState: function() {
        return {};
    },
    componentDidMount: function() {
        // this.scrollLock(findDOMNode(this));
    },
    componentWillUnmount: function() {
        // this.scrollRelease(findDOMNode(this));
    },
    render: function() {
        let {
            style
        } = this.props;
        style = merge(style, SsvStyle);
        return (
            <div style={style}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});