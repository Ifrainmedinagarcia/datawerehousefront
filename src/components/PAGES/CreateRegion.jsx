import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'


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
        width: 500
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

const createRegion = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_region": form.regionForm.value,
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

    form.regionForm.value = ''
}

const CreateRegion = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Agregar Región</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <form onSubmit={createRegion.bind()} className={classes.inputs}>
                            <TextField name='regionForm' className={classes.inputText} id="standard-basic" label="Región" size="small" required ></TextField>
                            <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                                <Button type='submit' className={`${classes.color}`} variant="text" >Guardar</Button>
                                <Button type='button' className={`danger ${classes.color}`} variant="text" >Actualizar</Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </div>

            </main>
        </>
    )
}

export default CreateRegion
