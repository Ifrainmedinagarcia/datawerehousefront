import React, { useEffect } from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { connect } from 'react-redux';
import store from '../../REDUX/store';
import { getAllChannels, getAllcities, getAllCommitments, getAllCompanies, getAllContacts, getAllPreferences, getAllRegions } from '../../REDUX/actionsCreators';
import axios from 'axios'
import FormAddEditContact from '../ORGANISMS/FormAddEditContact';

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const CreateContacts = (
    {
        channels,
        preferences,
        regions,
        companies

    }) => {

    useEffect(() => {
        store.dispatch(getAllChannels())
        store.dispatch(getAllCommitments())
        store.dispatch(getAllPreferences())
        store.dispatch(getAllCompanies())
        store.dispatch(getAllcities())
        store.dispatch(getAllContacts())
        store.dispatch(getAllRegions())

    }, [])

    const [src, setSrc] = React.useState('https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png');

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
            setSrc(url)
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSrc('https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png');
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
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registerContact = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_contact": form.nombre.value,
            "lastname_contact": form.apellido.value,
            "position": form.cargo.value,
            "address": form.address.value,
            "email_contact": form.correo.value,
            "contact_account": form.cuenta.value,
            "id_company": parseInt(form.idComany.value),
            "id_region": parseInt(form.idRegion.value),
            "id_photo": idFoto,
            "id_country": parseInt(form.idCountry.value),
            "id_city": parseInt(form.idCity.value),
            "id_preference": parseInt(form.preferencia.value),
            "id_commitment": parseInt(form.sliderCommitment.value),
            "id_channel_comunication": parseInt(form.idChannel.value),
            "id_user": userId
        }
        if (data.name_contact === '' && data.lastname_contact === '' && data.position === '' && data.address === '' && data.email_contact === '' && data.contact_account === '') {
            return alert('Por favor llenar correctamente los campos requeridos')
        }

        try {
            await axios.post('http://localhost:3001/v1/api/contacts', data, {
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
        form.sliderCommitment.value = 1
        form.idChannel.value = ''
    }

    return (
        <>
            <NavbarUser />
            <Cajon />
            <FormAddEditContact
                title='Crear Contacto'
                channels={channels}
                preferences={preferences}
                regions={regions}
                companies={companies}
                allRegion={allRegion}
                allCountry={allCountry}
                renderImage={renderImage}
                CityFromCountry={CityFromCountry}
                countryFromRegion={countryFromRegion}
                src={src}
                functionSubmit={registerContact.bind()}
                nameBtn='Crear'
                nombreValue='Nombre'
                apellidoValue='Apellido'
                cargoValue='Cargo'
                correoValue='Email'
                companyValue='Compañía'
                regionValue='Region'
                countryValue='País'
                cityValue='Ciudad'
                addressValue='Dirección'
                channelValue='Canal de contacto'
                cuentaValue='Cuenta'
                preferenceValue='Disponibilidad'
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

export default connect(mapStateToProps, {})(CreateContacts)
