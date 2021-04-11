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


const CreateCompany = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Agregar compañías</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <div className={classes.inputs}>
                            <TextField className={classes.inputText} label="Nombre" size="small" required ></TextField>

                            <TextField
                                select
                                label="País"
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option /* key={option.value} */ /* value={option.value} */>
                                    Venezuela
                                    </option>
                                <option /* key={option.value} */ /* value={option.value} */>
                                    México
                                    </option>

                            </TextField>
                            <TextField className={classes.inputText} label="Dirección" size="small" required ></TextField>
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

export default CreateCompany
