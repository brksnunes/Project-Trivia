import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => (<Login { ...props } />) }
      />
      <Route
        exact
        path="/settings"
        component={ Settings }
      />
      <Route
        path="/game"
        component={ Game }
      />
    </Switch>
  );
}
