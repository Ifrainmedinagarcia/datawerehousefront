import React from 'react';
import Home from './components/PAGES/Home';
import Register from './components/PAGES/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/PAGES/Login';
import Welcome from './components/PAGES/Welcome';
import FromRegion from './components/PAGES/FromRegion';

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/welcome/region" exact component={FromRegion} />
        <Route path="/welcome/country" exact component={FromRegion} />
      </Router>
    </>
  );
}

export default App;
