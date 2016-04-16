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
        private locatorTable: Object
        private linkerTable: Object
        constructor() {
            this.locatorTable = {};
            this.linkerTable = {};
        }
        linkLocator(link: string, locator: Element) {
            if (link) {
                this.locatorTable[link] = locator;
            }
        }
        unlinkLocator(link: string) {
            if (this.locatorTable[link]) {
                delete this.locatorTable[link];
            } 
        }
        getLocator(link: string) {
            return this.locatorTable[link] || null;
        }
        linkLinker(link: string, linker: Element) {
            if (link) {
                this.linkerTable[link] = linker;
            }
        }
        unlinkLinker(link: string) {
            if (this.linkerTable[link]) {
                delete this.linkerTable[link];
            }
        }
        getLinker(link: string) {
            return this.linkerTable[link] || null;
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
    export const eventEmitter = new EventEmitter();
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
            _navigator.linkLinker(this.props.locator, ReactDOM.findDOMNode(this));
        }
        componentWillUnmount() {
            _navigator.unlinkLinker(this.props.locator);
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
                fontSize: '0',
                overflowY: 'scroll'
            },
            className: ''
        }
        private element: Element
        private children: any[]
        private preActiveChildViewIdx = 0;
        constructor(props) {
            super(props);
            this.children = [].concat.apply([], this.props.children).filter((child) => {
                return child.type === View;
            }).map((child: View, key) => {
                return <li key={key} style={{
                    display: 'inline-block',
                    width: '100%',
                    height: '100%'
                }}>{child}</li>
            });
        }
        componentDidMount() {
            this.element = ReactDOM.findDOMNode(this);
            this.element.addEventListener('scroll', this.watchViewScroll.bind(this));
            eventEmitter.on('scrollTo', this.scrollToHandler.bind(this));
        }
        componentWillUnMount() {
            eventEmitter.off('scrollTo', this.scrollToHandler);
            this.element.removeEventListener('scroll', this.watchViewScroll);
        }
        watchViewScroll(e: Event) {
            const activeChildViewIdx = Math.floor(this.element.scrollTop / this.element.getBoundingClientRect().height);
            if (this.preActiveChildViewIdx !== activeChildViewIdx) {
                eventEmitter.emit('backScrollTo', activeChildViewIdx);
                this.preActiveChildViewIdx = activeChildViewIdx;
            }
        }
        scrollToHandler(childViewElement: Element) {
            _animteScroll.scrollTo(this.element, childViewElement.getBoundingClientRect().top, 500, (x) => {
                return x;
            });
        }
        render() {
            return (
                <ul style={assign(Container.defaultProps.style, this.props.style)} className={this.props.className}>
                    {this.children}
                </ul>
            )
        }
    }
}

export default NavigationView;
export import NavigationViewEvent = NavigationView.eventEmitter;
export import View = NavigationView.View;
export import Link = NavigationView.Link;
export import Container = NavigationView.Container;