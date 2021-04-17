import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'
import store from '../../REDUX/store'
import { getAllCompanies, getAllCountries } from '../../REDUX/actionsCreators'
import { connect } from 'react-redux';
import axios from 'axios'

store.dispatch(getAllCountries())
store.dispatch(getAllCompanies())

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
    inputs: {
        position: 'relative'
    },
    inputText: {
        position: 'relative',
        left: 10,
        margin: 10,
        width: 150
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

const createCompany = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_company": form.nameCompany.value,
        "id_country": form.countrySelection.value,
        "address": form.address.value,
        "id_user": userId
    }
    try {
        await axios.post('http://localhost:3001/v1/api/companies', data, {
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
        console.log(error)
    }
    form.nameCompany.value = ''
    form.countrySelection.value = ''
    form.address.value = ''
}

const CreateCompany = ({ countries }) => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Agregar compañías</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <form onSubmit={createCompany.bind()} className={classes.inputs}>
                            <TextField
                                className={classes.inputText}
                                label="Nombre"
                                size="small"
                                name='nameCompany'
                            >
                            </TextField>

                            <TextField
                                select
                                label="País"
                                name='countrySelection'
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option aria-label="None" value="" disabled selected></option>
                                {
                                    countries.length !== 0 ?
                                        countries.map(c => (
                                            <option key={c.id_country} value={c.id_country}>
                                                {c.name_country}
                                            </option>
                                        ))
                                        : <option>Aun no hay Regiones ingresadas</option>
                                }

                            </TextField>
                            <TextField
                                className={classes.inputText}
                                label="Dirección"
                                size="small"
                                name='address'
                            >
                            </TextField>
                            <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                                <Button type='submit' className={`${classes.color}`} variant="text" >Guardar</Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

const mapStateToProps = state => ({
    countries: state.countryReducer.countries
})
export default connect(mapStateToProps, {})(CreateCompany)
