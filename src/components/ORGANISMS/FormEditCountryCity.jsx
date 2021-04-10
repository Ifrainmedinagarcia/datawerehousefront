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


const FormEditCountryCity = ({ title, submitBtn, valueInput, labelRegion }) => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>{title}</h3>
                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <form onSubmit={submitBtn} className={classes.inputs}>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                name='regionSelect'
                                label="Región"
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option disabled selected>
                                    {labelRegion}
                                </option>
                                    ))


                        </TextField>
                            <TextField name='countryInput' className={classes.inputText} id="standard-basic" label={valueInput} size="small" required ></TextField>
                            <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                                <Button type='submit' className={`${classes.color}`} variant="text" >Actualizar</Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </div>
            </main>


        </>

    )
}

export default FormEditCountryCity
