import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from './components/layout/layout.jsx';
import MainPage from './components/mainPage/mainPage';

import Registration from './components/registration/registration.js';


const routes = (
    <div>
      <Route path="/" component={Layout}>
        <IndexRoute component={MainPage} />
      </Route>
    </div>

);

export default routes;
