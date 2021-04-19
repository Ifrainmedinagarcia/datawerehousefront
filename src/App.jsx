import React from 'react';
import Home from './components/PAGES/Home';
import Register from './components/PAGES/Register';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
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
import CreateContacts from './components/PAGES/CreateContacts';
import CreateCompany from './components/PAGES/CreateCompany';
import CreateCountry from './components/PAGES/CreateCountry';
import CreateRegion from './components/PAGES/CreateRegion';
import CreateCity from './components/PAGES/CreateCity';
import ProfileUser from './components/PAGES/ProfileUser';
import Protected from './components/HOC/Protected';
import Public from './components/HOC/Public';
import EditRegion from './components/PAGES/EditRegion';
import EditCountry from './components/PAGES/EditCountry';
import EditCity from './components/PAGES/EditCity';
import EditContact from './components/PAGES/EditContact';
import EditCompany from './components/PAGES/EditCompany';



function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Switch>
            <Public path="/" exact component={Home} />
            <Public path="/register" component={Register} />
            <Public path="/login" component={Login} />
            <Protected path="/welcome" component={Welcome} />
            <Protected path="/region/config" component={FormRegion} />
            <Protected path="/country/config" component={Formcountry} />
            <Protected path="/companies/config" component={Formcompany} />
            <Protected path="/contacts" component={Userview} />
            <Protected path="/company" component={Company} />
            <Protected path="/countries" component={Region} />
            <Protected path="/analitycs" component={Premium} />
            <Protected path="/create/contact" component={CreateContacts} />
            <Protected path="/crear/company" component={CreateCompany} />
            <Protected path="/add/country" component={CreateCountry} />
            <Protected path="/agregar/region" component={CreateRegion} />
            <Protected
              path="/edit/region"
              component={(props) => < EditRegion
                {...props}
                id={props.id}
                value={props.value} />} />
            <Protected
              path="/editar/country"
              component={(props) => <EditCountry
                {...props}
                id={props.id}
                labelRegion={props.labelRegion}
                idRegion={props.idRegion}
                labelCountry={props.labelCountry} />} />
            <Protected
              path="/modificar/city"
              component={(props) => <EditCity
                {...props}
                id={props.id}
                labelCountry={props.labelRegion}
                valueInputCity={props.valueInputCity} />} />
            <Protected
              path="/editar/contact"
              component={(props) => <EditContact
                {...props}
                id={props.id}
                nombreValue={props.nombreValue}
                apellidoValue={props.apellidoValue}
                cargoValue={props.cargoValue}
                src={props.src}
                correoValue={props.correoValue}
                companyValue={props.companyValue}
                regionValue={props.regionValue}
                countryValue={props.countryValue}
                cityValue={props.cityValue}
                addressValue={props.addressValue}
                channelValue={props.channelValue}
                cuentaValue={props.cuentaValue}
                preferenceValue={props.preferenceValue}
                defaultValue={props.defaultValue}
                idRegion={props.idRegion}
                idCountry={props.idCountry}
                idChannel={props.idChannel}
                idCommitment={props.idCommitment}
                idCompany={props.idCompany}
                idPreference={props.idPreference}
                idCity={props.idCity}
                idPhoto={props.idPhoto}
              />} />
            <Protected path="/ingresar/city" component={CreateCity} />
            <Protected
              path="/profile"
              component={(props) => <ProfileUser
                {...props}
                urlPhoto={props.urlPhoto}
              />} />
            <Protected
              path="/update/company"
              component={(props) => <EditCompany
                {...props}
                id={props.id}
                valueNameCompany={props.valueNameCompany}
                addressValue={props.addressValue}
                valueCountry={props.valueCountry} />} />

            {/* pagina 404 */}
          </Switch>
        </Router>
      </ThemeProvider>

    </>
  );
}

export default App;
