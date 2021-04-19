import React, { useEffect } from 'react'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllCountries } from '../../REDUX/actionsCreators'

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})

let id = []

const Formcountry = ({ regions, countries }) => {
    const classes = useStyle()

    useEffect(() => {
        store.dispatch(getAllCountries())
    }, [])

    const registerCountry = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_country": form.pais.value,
            "id_region": form.regionSelected.value,
            "id_user": userId
        }
        if (data.name_country === '' && data.id_region === '') {
            return alert('Imput vacío')
        }

        try {
            await axios.post('http://localhost:3001/v1/api/countries', data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
            })
            await store.dispatch(getAllCountries())
        } catch (error) {
            if (error) {
                alert('El país debe estar asociado a una región')
            }
        }

        form.pais.value = ''
    }

    const deleteCountry = async (e) => {
        e.preventDefault()
        try {
            id.forEach((element, index) => {
                axios.delete(`http://localhost:3001/v1/api/countries/${element}`, {
                    headers: { 'Authorization': JWT }
                })
                    .then(res => {
                        console.log(res)
                        id.splice(index, 1)
                    })
            })
            await store.dispatch(getAllCountries())
            if (countries.length === 0) {
                id = []
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkBox = async e => {
        if (e.target.checked) {
            id.push(parseInt(e.target.id))
            console.log(e.target.id)
            console.log(id);
        }
        if (!e.target.checked) {
            id.forEach((element, index) => {
                id.splice(index, 1)
            })
            console.log(id);
        }
    }

    return (
        <main className='container__form__region'>

            <div className="container__title__region">
                <TitleWelcomeForm
                    title='¡Muy bien! Ahora debes agregar los países según cada región, recuerda que también puedes agregar varios países'
                />
            </div>
            <div className="container__form__flex">
                <div className="form__input">
                    <h6 className="region__title">País</h6>
                    <form onSubmit={registerCountry.bind()} className='container__btn__config'>
                        <FormControl className='input' variant="outlined" margin='dense'>
                            <InputLabel htmlFor="outlined-age-native-simple">Region</InputLabel>
                            <Select
                                name='regionSelected'
                                native
                                label="Region"
                            >
                                <option aria-label="None" value="" />
                                {
                                    regions ?
                                        regions.map(r => (
                                            <option value={`${r.id_region}`}>{`${r.name_region}`}</option>
                                        ))
                                        : alert('Ocurrió un error, vaya a configurar las Regiones')
                                }

                            </Select>
                        </FormControl>
                        <TextField name='pais' className='input' label="País" variant="outlined" margin="dense" />
                        <Button type='submit' className={`btn__card ${classes.color} ${classes.top}`} variant="text">
                            Agregar
                        </Button>
                    </form>

                </div>
                <div className="line__center"></div>
                <div className="container__info__input">
                    <form onSubmit={deleteCountry.bind()} className="container__lists__region">
                        {
                            countries.length !== 0 ?
                                countries.map(c => (
                                    <div className="flex__check">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id={`${c.id_country}`}
                                                    className='block'
                                                    name={`${c.name_country}`}
                                                    color="primary"
                                                    onChange={checkBox}
                                                />
                                            }
                                            label={`${c.name_country}`}
                                        />
                                    </div>
                                ))
                                : <h2>Aún no hay paises ingresados</h2>
                        }

                        <div className="conteinar__btn__delete__continuar">
                            <ButtonGroup className='btn__action' variant="text" aria-label="">
                                {
                                    countries.length === 0 ?
                                        <Button disabled type='button' href='/companies/config' className={`${classes.color}`} variant="text" >Continuar</Button>
                                        : <Button type='button' href='/companies/config' className={`${classes.color}`} variant="text" >Continuar</Button>

                                }
                                <Button type='submit' className={`danger ${classes.color}`} variant="text" color="default">Eliminar</Button>
                            </ButtonGroup>

                        </div>
                    </form>

                </div>


            </div>

            <div className="container__img__region">
                <img className="img__footer__region" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />

            </div>

        </main>
    )
}

const mapStateToProps = state => ({
    regions: state.regionReducer.regions,
    countries: state.countryReducer.countries
})

export default connect(mapStateToProps, {})(Formcountry)
