import React from 'react'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'



const FromRegion = () => {
    return (
        <main className='container__form__region'>

            <div className="container__title__region">
                <TitleWelcomeForm
                    title='¿En qué región se encuentran tus clientes? Recuerda que puedes agregar varias regiones(hasta 5)'
                />
            </div>


            <div className="container__form__flex">


                <div className="form__input">
                    <h6 className="region__title">Región</h6>
                    <TextField className="input__region__add" id="" label="Región" variant="outlined" margin="dense" />
                    <Button className="btn__agregar" variant="text" color="default">
                        Agregar
                    </Button>

                </div>


                <div className="line__center"></div>


                <div className="container__info__input">


                    <form className="container__lists__region">
                        <div className="flex__check">
                            <input className="lists__item__region" type="checkbox" /><label className='label' for="">LATAM</label>
                        </div>

                    </form>


                    <div className="conteinar__btn__delete__continuar">

                        <ButtonGroup variant="text" color="default" aria-label="">
                            <Button className="btn__action" variant="text" color="default">Agregar</Button>
                            <Button className="btn__action danger" variant="text" color="default">Eliminar</Button>
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

export default FromRegion
