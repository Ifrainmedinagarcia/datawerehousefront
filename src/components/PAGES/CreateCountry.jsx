import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'
import { connect } from 'react-redux';
import axios from 'axios'
import store from '../../REDUX/store';
import { getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
store.dispatch(getAllRegions())
store.dispatch(getAllCountries())

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

const createCountry = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_country": form.countryInput.value,
        "id_region": form.regionSelect.value,
        "id_user": userId
    }

    if (data.name_country === '') {
        return alert('Input vacío')
    }

    try {
        await axios.post(`http://localhost:3001/v1/api/countries`, data, {
            headers: {
                'Authorization': JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
        })
        await store.dispatch(getAllCountries())
        await store.dispatch(getAllRegions())
    } catch (error) {
        console.log(error)
    }

    form.countryInput.value = ''
}

const CreateCountry = ({ regions }) => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Agregar País</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <form onSubmit={createCountry.bind()} className={classes.inputs}>
                            <TextField

                                select
                                name='regionSelect'
                                label="Región"
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
                                        : <option>Aun no hay Regiones ingresadas</option>
                                }

                            </TextField>
                            <TextField name='countryInput' className={classes.inputText} label="País" size="small" required ></TextField>
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
    regions: state.regionReducer.regions,
})

export default connect(mapStateToProps, {})(CreateCountry)
