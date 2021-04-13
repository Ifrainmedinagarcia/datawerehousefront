import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { connect } from 'react-redux'
import FormAddEditContact from '../ORGANISMS/FormAddEditContact'
import store from '../../REDUX/store'
import axios from 'axios'
import { getAllChannels, getAllcities, getAllCompanies, getAllContacts, getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
store.dispatch(getAllCountries())
store.dispatch(getAllChannels())
store.dispatch(getAllcities())
store.dispatch(getAllCompanies())
store.dispatch(getAllRegions())
store.dispatch(getAllContacts())

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


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

    const idRegion = props.location.idRegion
    const idCountry = props.location.idCountry
    const idChannel = props.location.idChannel
    const idCommitment = props.location.idCommitment
    const idCompany = props.location.idCompany
    const idPreference = props.location.idPreference
    const idCity = props.location.idCity


    const [srcProps, setSrcProps] = React.useState(src);

    const [idFoto, setIdFoto] = React.useState(null);

    const [allRegion, setAllRegion] = React.useState({})

    const [allCountry, setAllCountry] = React.useState({})

    const countryFromRegion = async (e) => {
        try {
            await axios.get(`http://localhost:3001/v1/api/regions/${e.target.value}`, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setAllRegion(res)
                setAllCountry('')
                console.log(res)
            })
        } catch (error) {
            console.log(error)

        }

    }

    const CityFromCountry = async e => {
        try {
            await axios.get(`http://localhost:3001/v1/api/countries/${e.target.value}`, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                setAllCountry(resp)
                console.log(allCountry);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderImage = async e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        console.log(file)
        reader.onloadend = function () {
            let url = reader.result
            setSrcProps(url)
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSrcProps('https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png');
        }

        const formdata = new FormData();
        formdata.append("file", file)

        try {
            await axios.post('http://localhost:3001/v1/api/file/upload', formdata, {
                headers: {
                    'Authorization': JWT
                }
            }).then(res => {
                setIdFoto(res.data.data.id_photo)
                console.log(res)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_contact": form.nombre.value || nombreValue,
            "lastname_contact": form.apellido.value || apellidoValue,
            "position": form.cargo.value || cargoValue,
            "address": form.address.value || addressValue,
            "email_contact": form.correo.value || correoValue,
            "contact_account": form.cuenta.value || cuentaValue,
            "id_company": parseInt(form.idComany.value || idCompany),
            "id_region": parseInt(form.idRegion.value || idRegion),
            "id_photo": idFoto || src,
            "id_country": parseInt(form.idCountry.value || idCountry),
            "id_city": parseInt(form.idCity.value || idCity),
            "id_preference": parseInt(form.preferencia.value || idPreference),
            "id_commitment": parseInt(form.sliderCommitment.value || idCommitment),
            "id_channel_comunication": parseInt(form.idChannel.value || idChannel),
            "id_user": parseInt(userId)
        }
        try {
            await axios.put(`http://localhost:3001/v1/api/contacts/${id}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
            })
            await store.dispatch(getAllContacts())
        } catch (error) {
            console.log(error);

        }
        form.nombre.value = ''
        form.apellido.value = ''
        form.cargo.value = ''
        form.address.value = ''
        form.correo.value = ''
        form.cuenta.value = ''
        form.idComany.value = ''
        form.idRegion.value = ''
        form.idCountry.value = ''
        form.idCity.value = ''
        form.preferencia.value = ''
        form.idChannel.value = ''
    }
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
                src={srcProps}
                functionSubmit={updateContact.bind()}
                companies={props.companies}
                allRegion={allRegion}
                allCountry={allCountry}
                regions={props.regions}
                channels={props.channels}
                preferences={props.preferences}
                allRegion={allRegion}
                allCountry={allCountry}
                renderImage={renderImage}
                CityFromCountry={CityFromCountry}
                countryFromRegion={countryFromRegion}
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
