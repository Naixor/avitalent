import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isArray, assign } from 'lodash';

declare namespace window {
    export const mozRequestAnimationFrame: (handler) => any
    export const webkitRequestAnimationFrame: (handler) => any
    export const requestAnimationFrame: (handler) => any
    export const setTimeout: (handler, time?:number) => any
    export const cancelAnimationFrame
    export const mozCancelAnimationFrame
    export const clearTimeout
}

namespace NavigationView {
    class Navigator {
        private hashTable: Object
        private views: Element[]
        constructor() {
            this.hashTable = {};
            this.views = [];
        }
        linkLocator(link: string, locator: Element) {
            if (link) {
                this.hashTable[link] = locator;
                this.views.push(locator);
            }
        }
        unlinkLocator(link: string) {
            if (this.hashTable[link]) {
                delete this.hashTable[link];
            } 
        }
        getLocator(link: string) {
            return this.hashTable[link] || null;
        }
    }
    
    class EventEmitter {
        private events: Object
        constructor() {
            this.events = {};
        }
        on(name: string, handler: Function, reason?: string) {
            if (!this.events[name] || !this.events[name].length) {
                this.events[name] = [];
            }
            this.events[name].push(handler);
        }
        off(name: string, handler: Function) {
            if (this.events[name]) {
                let idx = this.events[name].indexOf(handler);
                if (~idx) {
                    this.events[name].splice(idx, 1);
                }
            }
        }
        emit(name: string, ...args) {
            let len = this.events[name].length;
            if (len) {
                for (let i = 0; i < len; i++) {
                    this.events[name][i].apply(null, args);
                }
            }
        }
    }
    
    class TimeLine {
        animateQueue: any[]
        requestAnimationFrame: (callback: any) => any
        cancelAnimationFrame: (id: number) => any
        keyframeId: number = 0;
        preFrameTime: number = 0;
        firstFrameTime: number = 0;
        constructor() {
            this.animateQueue = [];
            this.requestAnimationFrame = window.requestAnimationFrame
                    || window.mozRequestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || function(callback) {
                        window.setTimeout(callback, 16)
                    };
            this.cancelAnimationFrame = window.cancelAnimationFrame
                    || window.mozCancelAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || window.clearTimeout;
        }
        addFrame(frame: (...args) => boolean) {
            this.animateQueue.push(frame);
        }
        play() {
            this.firstFrameTime = Date.now();
            this.preFrameTime = this.firstFrameTime;
            
            const doFrame = (params) => {
                let animate;
                let time = Date.now();
                let totalTime = time-this.firstFrameTime;
                let isContinue = false;
                
                for (let i = 0, animate; (animate = this.animateQueue[i]); i++) {
                    isContinue = animate(this.preFrameTime, time, totalTime);
                }

                if (isContinue) {
                    this.preFrameTime = time;
                    this.keyframeId = window.requestAnimationFrame(doFrame);
                } else {
                    this.stop();
                }
            }
            this.keyframeId = window.requestAnimationFrame(doFrame);
        }
        stop() {
            this.preFrameTime = 0;
            window.cancelAnimationFrame(this.keyframeId);
            this.animateQueue = [];
        }
    }
    
    const timeline = new TimeLine();
    
    class AnimateScroll {
        constructor() {
        }
        scrollTo(element: Element, scrolltop: number, time: number, easing: any, callback?: () => any) {
            let initScrollTop = element.scrollTop;
            let frame = (preTime, curTime, totalTime) => {
                if (totalTime > time) {
                    element.scrollTop = initScrollTop + scrolltop;
                    return false;
                }
                element.scrollTop += (curTime-preTime)/time * scrolltop;
                return true;
            }
            
            timeline.addFrame(frame);
            timeline.play();
        }
    }
    
    const _navigator = new Navigator();
    const eventEmitter = new EventEmitter();
    const _animteScroll = new AnimateScroll();
    
    interface ViewPropsInf {
        locator: string
        className?: string
        style?: any
    }
    interface ViewStateInf {
        
    }
    
    export class View extends React.Component<ViewPropsInf, ViewStateInf> {
        static defaultProps = {
            locator: null,
            style: {}
        }
        constructor(props) {
            super(props);        
        }
        componentDidMount() {
            _navigator.linkLocator(this.props.locator, ReactDOM.findDOMNode(this));
        }
        componentWillUnmount() {
            _navigator.unlinkLocator(this.props.locator);            
        }
        render() {
            return (
                <div className={this.props.className} style={this.props.style}>
                    {this.props.children}
                </div>
            )
        }
    }
    
    interface LinkPropsInf {
        locator: string
        className?: string
        style?: any
        activeStyle?: any
        activeClass?: string
        activeHandler?: (link: Element) => void
        onClick?: (e) => any
    }
    interface LinkStateInf {
        
    }
    
    export class Link extends React.Component<LinkPropsInf, LinkStateInf> {
        static defaultProps = {
            locator: null,
            style: {},
            className: '',
            activeStyle: {},
            activeClass: '',
            activeHandler: () => {},
            onClick: () => {}
        }
        constructor(props) {
            super(props);
        }
        componentDidMount() {

        }
        componentWillUnmount() {

        }
        linkLocator(e) {
            this.props.onClick(e);
            let element = _navigator.getLocator(this.props.locator);
            eventEmitter.emit('scrollTo', element, `Link ${location}`);
        }
        render() {
            return (
                <div className={this.props.className} style={this.props.style}
                    onClick={this.linkLocator.bind(this)}>
                    {this.props.children}
                </div>
            )
        }
    }
    
    interface ContainerPropsInf {
        style?: any
        className?: string
    }
    
    interface ContainerStateInf {
        
    }
    
    export class Container extends React.Component<ContainerPropsInf, ContainerStateInf> {
        static defaultProps = {
            style: {
                listStyle: 'none',
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflowY: 'scroll'
            },
            className: ''
        }
        private element: Element
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.element = ReactDOM.findDOMNode(this);
            eventEmitter.on('scrollTo', this.scrollToHandler.bind(this));            
        }
        scrollToHandler(childViewElement: Element) {
            _animteScroll.scrollTo(this.element, childViewElement.getBoundingClientRect().top, 500, (x) => {
                return x;
            });
        }
        render() {
            let children = [].concat.apply([], this.props.children);
            
            return (
                <ul style={assign(Container.defaultProps.style, this.props.style)} className={this.props.className}>
                    {
                        children.map((child, key) => {
                            if (child.type === View) {
                                return <li key={key} style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%'
                                }}>{child}</li>    
                            }
                            return child;
                        })
                    }
                </ul>
            )
        }
    }
}

export default NavigationView;
export import View = NavigationView.View;
export import Link = NavigationView.Link;
export import Container = NavigationView.Container;