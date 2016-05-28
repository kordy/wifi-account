import '../less/main.less';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router';
import { Routes } from '../routes';

import { Provider, connect } from 'react-redux'
import store from '../store/store';
import { createHashHistory , useBasename } from 'history'
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
//const history = syncHistoryWithStore(createHistory(), store);
const history = syncHistoryWithStore(useBasename(createHashHistory )({
	basename: '/'
}), store);

ReactDom.render(
		<Provider store={store}>
			<Router routes={Routes} history={history}/>
		</Provider>,
		document.getElementById('myApp')
);