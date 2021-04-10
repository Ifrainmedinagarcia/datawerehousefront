import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import store from '../../REDUX/store'
import axios from 'axios'
import { connect } from 'react-redux';
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'
import { getAllcities, getAllCountries } from '../../REDUX/actionsCreators';
store.dispatch(getAllCountries())
store.dispatch(getAllcities())

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
        width: 250
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

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const addCity = async e => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_city": form.cityInput.value,
        "id_country": form.countryOption.value,
        "id_user": userId
    }
    if (data.name_city === '') {
        return alert('Input vacío')
    }

    try {
        await axios.post(`http://localhost:3001/v1/api/cities`, data, {
            headers: {
                'Authorization': JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
        })
        await store.dispatch(getAllcities())
    } catch (error) {
        console.log(error)
    }

    form.cityInput.value = ''
}


const CreateCity = ({ countries }) => {
    const classes = useStyle()

    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Agregar Ciudad</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <form onSubmit={addCity.bind()} className={classes.inputs}>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                name='countryOption'
                                label="País"
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option selected disabled></option>
                                {
                                    countries.length !== 0 ?
                                        countries.map(c => (
                                            <option key={c.id_country} value={c.id_country} >
                                                {c.name_country}
                                            </option>
                                        ))
                                        : <option selected disabled>Aún no hay países ingresados</option>
                                }
                            </TextField>
                            <TextField name='cityInput' className={classes.inputText} id="standard-basic" label="Ciudad" size="small" required ></TextField>
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

export default connect(mapStateToProps, {})(CreateCity)
