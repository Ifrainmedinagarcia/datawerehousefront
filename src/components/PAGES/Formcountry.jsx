import React from 'react'
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


const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})


const Formcountry = () => {

    const classes = useStyle()
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

                    <div className='container__btn__config'>

                        <FormControl className='input' variant="outlined" margin='dense'>
                            <InputLabel htmlFor="outlined-age-native-simple">Region</InputLabel>

                            <Select
                                native
                                label="Region"

                            >
                                <option aria-label="None" value="" />
                                <option value={10}>LATAM</option>
                                <option value={20}>EUROPA</option>
                            </Select>
                        </FormControl>
                        <TextField className='input' id="" label="País" variant="outlined" margin="dense" />
                        <Button className={`btn__card ${classes.color} ${classes.top}`} variant="text">
                            Agregar
                        </Button>
                    </div>

                </div>


                <div className="line__center"></div>


                <div className="container__info__input">


                    <form className="container__lists__region">

                        <div className="flex__check">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className='block'
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="España"
                            />
                        </div>

                    </form>


                    <div className="conteinar__btn__delete__continuar">

                        <ButtonGroup className='btn__action' variant="text" aria-label="">
                            <Button className={`${classes.color}`} variant="text" >Agregar</Button>
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

export default Formcountry
