import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { Avatar, makeStyles, TextField, ButtonGroup, AccordionSummary } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Sliderbtn from '../ATOMS/Sliderbtn';
import { connect } from 'react-redux';
import store from '../../REDUX/store';
import { getAllChannels, getAllcities, getAllCommitments, getAllCompanies, getAllPreferences } from '../../REDUX/actionsCreators';
import axios from 'axios'
store.dispatch(getAllChannels())
store.dispatch(getAllCommitments())
store.dispatch(getAllPreferences())
store.dispatch(getAllCompanies())
store.dispatch(getAllcities())

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const useStyle = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
        paddingLeft: 300,
        position: 'relative',
        margin: 'auto',
        top: 30
    },
    input: {
        display: 'none',
        position: 'absolute',

    },
    absolute: {
        position: 'absolute',
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginLeft: 10,
        marginTop: 25,
        zIndex: 1
    },
    camera: {
        marginLeft: 40,
        marginTop: 45
    },
    inputText: {
        position: 'relative',
        left: 10,
        margin: 10,
        width: 150
    },
    inputs: {
        position: 'relative'
    },
    slider: {
        position: 'relative',
        left: 20,
        marginTop: 50
    },
    avatar: {
        position: 'relative',
        margin: 'auto',
        width: 100
    },
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    },
    position: {
        marginLeft: 100,
        marginTop: 20
    }

}))

const CreateContacts = (
    {
        channels,
        commitments,
        preferences,
        regions,
        companies
    }) => {
    const classes = useStyle()

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

        try {
            await axios.post('http://localhost:3001/v1/api/file/upload', file, {
                headers: {
                    'Authorization': JWT
                }
            }).then(res => {
                console.log(res);
                setIdFoto(res.data.id_photo)
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
            "contact_account": form.cuenta.value,
            "id_company": form.idComany.value,
            "id_region": form.idRegion.value,
            "id_photo": idFoto,
            "id_country": form.idCountry.value,
            "id_city": form.idCity.value,
            "id_preference": form.preferencia.value,
            "id_commitment": form.sliderCommitment.value,
            "id_cannel_comunication": form.idChannel.value,
            "id_user": userId
        }
        if (data.name_company === '' && data.id_country === '' && data.address === '') {
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
            await store.dispatch(getAllCompanies())
        } catch (error) {
            if (error) {
                alert('La compañía debe estar asociada a un país')
            }
        }

        form.company.value = ''
        form.address.value = ''
    }

    return (
        <>
            <NavbarUser />
            <Cajon />
            <form onSubmit={registerContact.bind()} className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Crea tu contacto</h3>
                <div className={classes.avatar}>
                    <input name='image' onChange={renderImage} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <img style={{ borderRadius: '200px' }} className={classes.absolute} src={src} />
                    <label className={`${classes.absolute} ${classes.camera}`} htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <div className={classes.inputs}>
                            <TextField
                                name='nombre'
                                className={classes.inputText}
                                id="standard-basic"
                                label="Nombre"
                                size="small"
                                required >
                            </TextField>
                            <TextField
                                name='apellido'
                                className={classes.inputText}
                                id="standard-basic"
                                label="Apellido"
                                size="small"
                                required >
                            </TextField>
                            <TextField
                                name='cargo'
                                className={classes.inputText}
                                id="standard-basic"
                                label="Cargo"
                                size="small"
                                required >
                            </TextField>
                            <TextField
                                name='correo'
                                className={classes.inputText}
                                id="standard-basic"
                                label="Email"
                                type='email'
                                size="small"
                                required >
                            </TextField>
                            <TextField
                                name='compania'
                                id="standard-select-currency-native"
                                select
                                name='idComany'
                                label="Compañías"
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option aria-label="None" value="" disabled selected></option>
                                {
                                    companies.length !== 0 ?
                                        companies.map(c => (
                                            <option key={c.id_company} value={c.id_company}>
                                                {c.name_company}
                                            </option>
                                        ))
                                        : <option>Aun no hay compañías ingresadas</option>

                                }
                            </TextField>
                        </div>
                    </div>
                </div>

                <div className='container__body__inputs'>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        name='idRegion'
                        label="Region"
                        onChange={countryFromRegion}
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" disabled selected></option>
                        {
                            regions.length !== 0 ?
                                regions.map(r => (
                                    <option key={r.id_region} value={r.id_region}>
                                        {r.name_region}
                                    </option>
                                ))
                                : <option>
                                    Debe configurar una ciudad
                                </option>
                        }
                    </TextField>
                    <TextField
                        name
                        id="standard-select-currency-native"
                        select
                        onChange={CityFromCountry}
                        label="País"
                        name='idCountry'
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" disabled selected></option>
                        {
                            allRegion.data !== undefined ?
                                allRegion.data.data.Paises.map(c => (
                                    <option key={c.id_country} value={c.id_country}>
                                        {c.name_country}
                                    </option>

                                ))
                                : <option>Debes agregar un país</option>
                        }
                    </TextField>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        name='idCity'
                        label="Cuidad"
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" disabled selected></option>
                        {
                            allCountry.data !== undefined ?
                                allCountry.data.data.City.map(c => (
                                    <option key={c.id_city} value={c.id_city}>
                                        {c.name_city}
                                    </option>
                                ))
                                : <option disabled>Debes agregar un ciudad</option>
                        }

                    </TextField>
                    <TextField
                        className={classes.inputText}
                        id="standard-basic"
                        label="Dirección"
                        size="small"
                        required
                        name='address'
                    >
                    </TextField>
                    <div className={classes.slider}>
                        <Sliderbtn name='sliderCommitment' />
                    </div>

                    <div className={classes.slider}>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            name='idChannel'
                            label="Canal de contacto"
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option aria-label="None" value="" disabled selected></option>

                            {
                                channels.length !== 0 ?
                                    channels.map(c => (
                                        <option key={c.id_channel_comunication} value={c.id_channel_comunication}>
                                            {c.name_channel}
                                        </option>
                                    ))
                                    : <option>Hay un error, recarge la página</option>
                            }

                        </TextField>

                        <TextField
                            name='cuenta'
                            className={classes.inputText}
                            id="standard-basic"
                            label="Cuenta de Usuario"
                            size="small"
                            required >
                        </TextField>
                        <TextField
                            name='preferencia'
                            id="standard-select-currency-native"
                            select
                            label="Preferencias"
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option aria-label="None" value="" disabled selected></option>
                            {
                                preferences.length !== 0 ?
                                    preferences.map(p => (
                                        <option key={p.id_preference} value={p.id_preference}>
                                            {p.name_preference}
                                        </option>

                                    ))
                                    : <option>Hay un error, recargue la página</option>
                            }

                        </TextField>
                        <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                            <Button type='submit' className={`${classes.color}`} variant="text" >Crear</Button>
                            <Button className={`danger ${classes.color}`} variant="text" >Actualizar</Button>
                        </ButtonGroup>

                    </div>

                </div>
            </form>
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
