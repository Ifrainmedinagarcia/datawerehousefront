import React from 'react'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'
import { connect } from 'react-redux'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')
store.dispatch(getAllRegions())

const registerRegion = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_region": form.region.value,
        "id_user": userId
    }

    if (data.name_region === '') {
        return alert('Imput vacío')
    }

    try {
        await axios.post('http://localhost:3001/v1/api/regions', data, {
            headers: {
                'Authorization': JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
            })

        await store.dispatch(getAllRegions())

    } catch (error) {
        console.log(error);
    }

    form.region.value = ''
}
const id = []

const Frominit = ({ regions }) => {
    const classes = useStyle()

    const deleteRegion = async (e) => {
        console.log(e.target.id);
        e.preventDefault()
        try {
            id.forEach((element, index) => {
                axios.delete(`http://localhost:3001/v1/api/regions/${element}`, {
                    headers: { 'Authorization': JWT }
                })
                    .then(res => {
                        console.log(res)
                        id.splice(index, 1)
                    })
            })
            await store.dispatch(getAllRegions())
            if (regions.length === 0) {
                id = []
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkBox = async e => {
        console.log(e.target.checked);
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
                    title='¿En qué región se encuentran tus clientes? Recuerda que puedes agregar varias regiones(hasta 5)'
                />
            </div>

            <div className="container__form__flex">

                <form onSubmit={registerRegion.bind()} className="form__input">

                    <h6 className="region__title">Continente</h6>

                    <div className='container__btn__config'>

                        <TextField name='region' className='input' label="Región" variant="outlined" margin="dense" />
                        <Button type='submit' className={`btn__card ${classes.color} ${classes.top}`} variant="text">
                            Agregar
                        </Button>
                    </div>

                </form>

                <div className="line__center"></div>
                <div className="container__info__input">

                    <form onSubmit={deleteRegion.bind()} className="container__lists__region">
                        {console.log(regions)}
                        {
                            regions.length !== 0 ?
                                regions.map(resp => (
                                    <div className="flex__check" key={resp.id_region}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id={`${resp.id_region}`}
                                                    className='block'
                                                    name={`${resp.name_region}`}
                                                    color="primary"
                                                    onChange={checkBox}
                                                />
                                            }
                                            label={`${resp.name_region}`}
                                        />
                                    </div>
                                ))
                                : <h2>Aún no hay región ingresada</h2>
                        }
                        <div className="conteinar__btn__delete__continuar">
                            <ButtonGroup className='btn__action' variant="text" aria-label="">
                                {
                                    regions.length === 0 ?
                                        <Button type='button' disabled href='/country/config' className={`${classes.color}`} variant="text" >Continuar</Button>
                                        :
                                        <Button type='button' href='/country/config' className={`${classes.color}`} variant="text" >Continuar</Button>
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
    regions: state.regionReducer.regions
})


export default connect(mapStateToProps, {})(Frominit)
