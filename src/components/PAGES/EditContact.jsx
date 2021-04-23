import React, { useEffect } from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { connect } from 'react-redux'
import FormAddEditContact from '../ORGANISMS/FormAddEditContact'
import store from '../../REDUX/store'
import axios from 'axios'
import { getAllChannels, getAllcities, getAllCompanies, getAllContacts, getAllCountries, getAllRegions } from '../../REDUX/actionsCreators'
import SimpleBackdrop from '../ATOMS/SimpleBackdrop'
import { useHistory } from "react-router-dom"
import CustomizedSnackbars from '../ATOMS/CustomizedSnackbars'



const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const EditContact = (props) => {
    const [loader, setLoader] = React.useState(false)
    let history = useHistory()

    useEffect(() => {
        store.dispatch(getAllCountries())
        store.dispatch(getAllChannels())
        store.dispatch(getAllcities())
        store.dispatch(getAllCompanies())
        store.dispatch(getAllRegions())
        store.dispatch(getAllContacts())
    }, [])

    const id = props.location.id
    const src = props.location.src
    const idRegion = props.location.idRegion
    const idCountry = props.location.idCountry
    const idChannel = props.location.idChannel
    const idCommitment = props.location.idCommitment
    const idCompany = props.location.idCompany
    const idPreference = props.location.idPreference
    const idCity = props.location.idCity
    const idPhotoProps = props.location.idPhoto

    const [srcProps, setSrcProps] = React.useState(src);

    const [idFoto, setIdFoto] = React.useState(null);

    const [allRegion, setAllRegion] = React.useState({})

    const [allCountry, setAllCountry] = React.useState({})

    const [errorGeneral] = React.useState(false)

    const [message, setMessage] = React.useState(false)

    const [updateLabel] = React.useState(
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

    const countryFromRegion = async (e) => {
        if (e.target.value === '') {
            setAllRegion({})
            setAllCountry({})
            return
        }
        try {
            await axios.get(`https://datawerehouse.herokuapp.com/v1/api/regions/${e.target.value}`, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setAllRegion(res)
                setAllCountry({})
                console.log(res)
            })
        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
        }

    }

    const CityFromCountry = async e => {
        if (e.target.value === '') {
            setAllCountry({})
            return
        }
        try {
            await axios.get(`https://datawerehouse.herokuapp.com/v1/api/countries/${e.target.value}`, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                setAllCountry(resp)
            })
        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
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
            setLoader(true)
            await axios.post('https://datawerehouse.herokuapp.com/v1/api/file/upload', formdata, {
                headers: {
                    'Authorization': JWT
                }
            }).then(res => {
                setIdFoto(res.data.data.id_photo)
                console.log(res)
            })
        } catch (error) {
            if (error) {
                alert('El tamaño de la imagen supera los 2MB, por favor elegir una foto menor a 2MB')
            }
        }
        finally {
            setLoader(false)
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
            "id_photo": idFoto || idPhotoProps,
            "id_country": parseInt(form.idCountry.value || idCountry),
            "id_city": parseInt(form.idCity.value || idCity),
            "id_preference": parseInt(form.preferencia.value || idPreference),
            "id_commitment": parseInt(form.sliderCommitment.value || idCommitment),
            "id_channel_comunication": parseInt(form.idChannel.value || idChannel),
            "id_user": parseInt(userId)
        }

        try {
            setMessage(false)
            await axios.put(`https://datawerehouse.herokuapp.com/v1/api/contacts/${id}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                store.dispatch(getAllContacts())
                setMessage(true)
            })
            await store.dispatch(getAllContacts())
        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
        }
        finally {
            history.push('/contacts')
        }
    }
    return (
        <>
            <NavbarUser />
            <Cajon />
            {
                loader ?
                    <SimpleBackdrop />
                    : ''
            }
            {
                message ?
                    <CustomizedSnackbars
                        message='Contacto actualizado con éxito'
                    />
                    : ''
            }
            <FormAddEditContact
                title='Editar Contactos'
                nameBtn='Actualizar'
                nombreValue={updateLabel.nombreValue}
                apellidoValue={updateLabel.apellidoValue}
                cargoValue={updateLabel.cargoValue}
                correoValue={updateLabel.correoValue}
                companyValue={updateLabel.companyValue}
                regionValue={updateLabel.regionValue}
                countryValue={updateLabel.countryValue}
                cityValue={updateLabel.cityValue}
                addressValue={updateLabel.addressValue}
                channelValue={updateLabel.channelValue}
                cuentaValue={updateLabel.cuentaValue}
                preferenceValue={updateLabel.preferenceValue}
                defaultValue={updateLabel.defaultValue}
                src={srcProps}
                functionSubmit={updateContact.bind()}
                companies={props.companies}
                allRegion={allRegion}
                allCountry={allCountry}
                regions={props.regions}
                channels={props.channels}
                preferences={props.preferences}
                errorName={errorGeneral}
                errorLast={errorGeneral}
                errorPoss={errorGeneral}
                errorAddress={errorGeneral}
                errorEmail={errorGeneral}
                errorAccount={errorGeneral}
                errorCompany={errorGeneral}
                errorRegion={errorGeneral}
                errorCountry={errorGeneral}
                errorCity={errorGeneral}
                errorChannel={errorGeneral}
                errorDis={errorGeneral}
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
