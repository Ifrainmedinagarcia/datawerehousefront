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
    const src = props.location.src
    const idRegion = props.location.idRegion
    const idCountry = props.location.idCountry
    const idChannel = props.location.idChannel
    const idCommitment = props.location.idCommitment
    const idCompany = props.location.idCompany
    const idPreference = props.location.idPreference
    const idCity = props.location.idCity
    const idPhoto = props.location.idPhoto

    const [srcProps, setSrcProps] = React.useState(src);

    const [idFoto, setIdFoto] = React.useState(null);

    const [allRegion, setAllRegion] = React.useState({})

    const [allCountry, setAllCountry] = React.useState({})

    const [updateLabel, setUdateLabes] = React.useState(
        {
            id: props.location.id,
            nombreValue: props.location.nombreValue,
            apellidoValue: props.location.apellidoValue,
            cargoValue: props.location.cargoValue,
            src: props.location.src,
            correoValue: props.location.correoValue,
            companyValue: props.location.companyValue,
            regionValue: props.location.regionValue,
            countryValue: props.location.countryValue,
            cityValue: props.location.cityValue,
            addressValue: props.location.addressValue,
            channelValue: props.location.channelValue,
            cuentaValue: props.location.cuentaValue,
            preferenceValue: props.location.preferenceValue,
            defaultValue: props.location.defaultValue
        }
    )

    const [updateIdLabel, setUpdateIdLabel] = React.useState(
        {
            companyValue: props.location.companyValue,
            regionValue: props.location.regionValue,
            countryValue: props.location.countryValue,
            cityValue: props.location.cityValue,
            channelValue: props.location.channelValue,
            preferenceValue: props.location.preferenceValue,
        }
    )

    console.log(updateLabel)
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
            "name_contact": form.nombre.value || updateLabel.nombreValue,
            "lastname_contact": form.apellido.value || updateLabel.apellidoValue,
            "position": form.cargo.value || updateLabel.cargoValue,
            "address": form.address.value || updateLabel.addressValue,
            "email_contact": form.correo.value || updateLabel.correoValue,
            "contact_account": form.cuenta.value || updateLabel.cuentaValue,
            "id_company": parseInt(form.idComany.value || idCompany),
            "id_region": parseInt(form.idRegion.value || idRegion),
            "id_photo": idFoto || idPhoto,
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
            await props.contacts.map(c => {
                setUpdateIdLabel(
                    {
                        companyValue: c.Company.name_company,
                        regionValue: c.Region.name_region,
                        countryValue: c.Country.name_country,
                        cityValue: c.City.name_city,
                        channelValue: c.Channel.name_channel,
                        preferenceValue: c.Preference.name_preference,
                    }
                )
            })
            setUdateLabes(
                {
                    nombreValue: form.nombre.value,
                    apellidoValue: form.apellido.value,
                    cargoValue: form.cargo.value,
                    correoValue: form.correo.value,
                    addressValue: form.address.value,
                    cuentaValue: form.cuenta.value,
                    defaultValue: form.sliderCommitment.value,
                }
            )

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
                nombreValue={updateLabel.nombreValue}
                apellidoValue={updateLabel.apellidoValue}
                cargoValue={updateLabel.cargoValue}
                correoValue={updateLabel.correoValue}
                companyValue={updateIdLabel.companyValue}
                regionValue={updateIdLabel.regionValue}
                countryValue={updateIdLabel.countryValue}
                cityValue={updateIdLabel.cityValue}
                addressValue={updateLabel.addressValue}
                channelValue={updateIdLabel.channelValue}
                cuentaValue={updateLabel.cuentaValue}
                preferenceValue={updateIdLabel.preferenceValue}
                defaultValue={updateLabel.defaultValue}
                src={srcProps}
                functionSubmit={updateContact.bind()}
                companies={props.companies}
                allRegion={allRegion}
                allCountry={allCountry}
                regions={props.regions}
                channels={props.channels}
                preferences={props.preferences}
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
    companies: state.companiesReducer.companies,
    contacts: state.contactsReducer.contacts
})


export default connect(mapStateToProps, {})(EditContact)
