import React from 'react';
import Home from './components/PAGES/Home';
import Register from './components/PAGES/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/PAGES/Login';
import Welcome from './components/PAGES/Welcome';
import Formcountry from './components/PAGES/Formcountry';
import FormRegion from './components/PAGES/FormRegion'
import Formcompany from './components/PAGES/Formcompany';
import Userview from './components/PAGES/Userview';

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/welcome/region" exact component={FormRegion} />
        <Route path="/welcome/country" exact component={Formcountry} />
        <Route path="/welcome/company" exact component={Formcompany} />
        <Route path="/contacts" exact component={Userview} />
      </Router>

    </>
  );
}

export default App;
