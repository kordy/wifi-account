import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from './components/layout/layout.jsx';
import MainPage from './components/mainPage/mainPage';
import PersonalInfo from './components/personalInfo/personalInfo';
import Finance from './components/finance/finance';
import Settings from './components/settings/settings';
import Statistic from './components/statistic/statistic';

import Registration from './components/registration/registration.js';


const mainRoute = {
  component: MainPage,
  isIndex: true
};

const personalInfoRoute = {
  component: PersonalInfo,
  path: 'personalInfo',
  name: 'Личная информация'
};

const financeRoute = {
  component: Finance,
  path: 'finance',
  name: 'Финансы'
};

const settingsRoute = {
  component: Settings,
  path: 'settings',
  name: 'Настройки'
};

const statisticRoute = {
  component: Statistic,
  path: 'statistic',
  name: 'Статистика'
};

const leftMenu = [
  personalInfoRoute,
  financeRoute,
  settingsRoute,
  statisticRoute
];

const mainRoutes = [
  mainRoute,
  personalInfoRoute,
  financeRoute,
  settingsRoute,
  statisticRoute
];

const routesTree = [
  {
    path: '/',
    component: Layout,
    children: mainRoutes
  }
];


const showRoutes = (routes) => {
  if (!routes) return null;
  return routes.map((route, i) => {
    const Component = route.isIndex ? IndexRoute : Route;
    return (
      <Component key={ i } path={ route.path } component={ route.component }>
        { showRoutes(route.children) }
      </Component>
    )



  });
};

console.log(leftMenu);
export const Routes = showRoutes(routesTree);
export const LeftMenu = leftMenu;
