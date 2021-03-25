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
import { ThemeProvider } from '@material-ui/styles';
import Company from './components/PAGES/Company';
import Premium from './components/PAGES/Premium';
import Region from './components/PAGES/Region';

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/region/config" component={FormRegion} />
          <Route path="/country/config" component={Formcountry} />
          <Route path="/companies/config" component={Formcompany} />
          <Route path="/contacts" component={Userview} />
          <Route path="/company" component={Company} />
          <Route path="/countries" component={Region} />
          <Route path="/analitycs" component={Premium} />
        </Router>
      </ThemeProvider>

    </>
  );
}

export default App;
