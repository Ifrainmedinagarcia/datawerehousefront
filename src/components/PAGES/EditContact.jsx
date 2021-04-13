import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { connect } from 'react-redux';
import FormAddEditContact from '../ORGANISMS/FormAddEditContact'
import store from '../../REDUX/store';
import { getAllChannels, getAllcities, getAllCompanies, getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
store.dispatch(getAllCountries())
store.dispatch(getAllChannels())
store.dispatch(getAllcities())
store.dispatch(getAllCompanies())
store.dispatch(getAllRegions())

const EditContact = (props) => {
    const id = props.location.id
    const nombreValue = props.location.nombreValue
    const apellidoValue = props.location.apellidoValue
    const cargoValue = props.location.cargoValue
    const src = props.location.src
    const correoValue = props.location.correoValue
    const companyValue = props.location.companyValue
    const regionValue = props.location.regionValue
    const countryValue = props.location.countryValue
    const cityValue = props.location.cityValue
    const addressValue = props.location.addressValue
    const channelValue = props.location.channelValue
    const cuentaValue = props.location.cuentaValue
    const preferenceValue = props.location.preferenceValue
    const defaultValue = props.location.defaultValue
    return (
        <>
            <NavbarUser />
            <Cajon />
            <FormAddEditContact
                title='Editar Contactos'
                nameBtn='Actualizar'
                nombreValue={nombreValue}
                apellidoValue={apellidoValue}
                cargoValue={cargoValue}
                correoValue={correoValue}
                companyValue={companyValue}
                regionValue={regionValue}
                countryValue={countryValue}
                cityValue={cityValue}
                addressValue={addressValue}
                channelValue={channelValue}
                cuentaValue={cuentaValue}
                preferenceValue={preferenceValue}
                defaultValue={defaultValue}
                src={src}
            />
        </>
    )
}
const mapStateToProps = state => ({
    channels: state.channelsReducer.channels,
    preferences: state.preferencesReducer.preferences,
    regions: state.regionReducer.regions,
    companies: state.companiesReducer.companies
})


export default connect(mapStateToProps, {})(EditContact)
