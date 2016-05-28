import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LayoutConstants from './constants/layoutConstants';

import Layout from './components/layout/layout.jsx';
import MainPage from './pages/mainPage/mainPage';
import PersonalInfo from './pages/personalInfoPage/personalInfoPage';
import Finance from './pages/financePage/financePage';
import Settings from './pages/settingsPage/settingsPage';
import Statistic from './pages/statisticPage/statisticPage';
import Registration from './pages/registrationPage/registrationPage.js';
import LoginPage from './pages/loginPage/loginPage';

const mainRoute = {
  component: MainPage,
  isIndex: true
};

const LoginPageRoute = {
  component: LoginPage,
  path: 'login',
  pageClassModifiers: 'login',
  noAuth: true,
  layout: LayoutConstants.LAYOUT_EMPTY,
  name: 'Войти'
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
  LoginPageRoute,
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
      <Component key={ i } path={ route.path } component={ route.component } params={route}>
        { showRoutes(route.children) }
      </Component>
    )




  });
};

console.log(leftMenu);
export const Routes = showRoutes(routesTree);
export const LeftMenu = leftMenu;
