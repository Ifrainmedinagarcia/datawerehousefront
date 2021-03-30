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
import { getAllRegions, deleteFromRegion } from '../../REDUX/actionsCreators'
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

const registerRegion = e => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_region": form.region.value,
        "id_user": userId
    }

    axios.post('http://localhost:3001/v1/api/regions', data, {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(res)

        }).catch(e => console.log(e))


    form.region.value = ''
}




const Frominit = ({ regions }) => {
    const classes = useStyle()
    const [id, setId] = React.useState([])

    const seletedRegion = (e) => {
        console.log(e.target.checked);
        if (e.target.checked && id !== []) {
            setId([
                ...id,
                e.target.id
            ])
            console.log(id)
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

                    <h6 className="region__title">Región</h6>

                    <div className='container__btn__config'>

                        <TextField name='region' className='input' id="" label="Región" variant="outlined" margin="dense" />
                        <Button onClick={store.dispatch(getAllRegions())} type='submit' className={`btn__card ${classes.color} ${classes.top}`} variant="text">
                            Agregar
                        </Button>
                    </div>

                </form>

                <div className="line__center"></div>
                <div className="container__info__input">

                    <form className="container__lists__region">
                        {
                            regions.data ?
                                regions.data.map(resp => (
                                    <div className="flex__check" key={resp.id_region}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id={`${resp.id_region}`}
                                                    className='block'
                                                    name={`${resp.name_region}`}
                                                    color="primary"
                                                    onChange={seletedRegion.bind()}
                                                />
                                            }
                                            label={`${resp.name_region}`}
                                        />
                                    </div>
                                ))
                                : <h2>Aún no hay región ingresada</h2>
                        }

                    </form>
                    <div className="conteinar__btn__delete__continuar">

                        <ButtonGroup className='btn__action' variant="text" aria-label="">
                            <Button href='/country/config' className={`${classes.color}`} variant="text" >Continuar</Button>
                            <Button className={`danger ${classes.color}`} variant="text" color="default">Eliminar</Button>
                        </ButtonGroup>

                    </div>
                </div>
            </div>

            <div className="container__img__region">
                <img className="img__footer__region" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />

            </div>

        </main>
    )
}

const mapStateToProps = state => ({
    regions: state.regionReducer
})




export default connect(mapStateToProps, {})(Frominit)
