import React from 'react'
import { makeStyles, TextField, ButtonGroup, Button } from '@material-ui/core'
import { connect } from 'react-redux';

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


const FormAddEditCompany = ({ title, btnName, SubmitBtn, addressValue, valueCountry, valueNameCompany, countries }) => {
    const classes = useStyle()
    return (
        <main className={classes.content}>
            <h3 style={{ textAlign: 'center' }}>{title}</h3>
            <div className='container__crear'>
                <div className='container__main__crear'>
                    <form onSubmit={SubmitBtn} className={classes.inputs}>
                        <TextField
                            className={classes.inputText}
                            label={valueNameCompany}
                            size="small"
                            name='nombreCompany'
                        >
                        </TextField>

                        <TextField
                            select
                            name='valueCountry'
                            label={valueCountry}
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option selected disabled></option>
                            {
                                countries.length !== 0 ?
                                    countries.map(c => (
                                        <option key={c.id_country.toString()} value={c.id_country}>
                                            {c.name_country}
                                        </option>
                                    ))
                                    : <option disabled>Debes agregar un país</option>
                            }
                        </TextField>
                        <TextField
                            className={classes.inputText}
                            size="small"
                            name='addressValue'
                            label={addressValue} >
                        </TextField>
                        <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                            <Button type='submit' className={`${classes.color}`} variant="text" >{btnName}</Button>
                        </ButtonGroup>
                    </form>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = state => ({
    countries: state.countryReducer.countries
})
export default connect(mapStateToProps, {})(FormAddEditCompany)
