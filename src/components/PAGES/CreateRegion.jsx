import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'

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
                        <div className={classes.inputs}>
                            <TextField className={classes.inputText} id="standard-basic" label="Región" size="small" required ></TextField>
                            <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                                <Button className={`${classes.color}`} variant="text" >Guardar</Button>
                                <Button className={`danger ${classes.color}`} variant="text" >Actualizar</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default CreateRegion
