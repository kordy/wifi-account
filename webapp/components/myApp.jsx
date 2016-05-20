import '../less/main.less';

import React from 'react';
import ReactDom from 'react-dom';
import Router from 'react-router';

import { Routes } from '../routes';

import { Provider, connect } from 'react-redux'
import store from '../store/store';
import { createHistory, useBasename } from 'history'

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const history = useBasename(createHistory)({
	basename: '/'
});

ReactDom.render(
		<Provider store={store}>
			<Router routes={Routes} history={history}/>
		</Provider>,
		document.getElementById('myApp')
);