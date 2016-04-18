import './stylesheets/main.css';

import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
// import { createStore, combineReducers, Reducer } from 'redux';
// import { Provider } from 'react-redux';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard';
import { Editor } from './components/editor';

injectTapEventPlugin();

render((
    <Router history={hashHistory}>
        <Route path="/" component={Dashboard}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/editor" component={Editor}></Route>                
    </Router>
), document.getElementById('editor'));