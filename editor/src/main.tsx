import './stylesheets/main.css';

import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
// import { createStore, combineReducers, Reducer } from 'redux';
// import { Provider } from 'react-redux';
import { app } from './components/app';

injectTapEventPlugin();

render((
    <Router history={hashHistory}>
        <Route path="/" component={app}>
        </Route>
    </Router>
), document.getElementById('editor'));