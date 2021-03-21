import React from 'react'
import Button from '@material-ui/core/Button'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'

const Welcome = () => {
    return (
        <main className="main">
            <TitleWelcomeForm
                title='Bienvenid@ Ifrain Antes de empezar debes configurar tu cuenta'
            />
            <Button className="btn__card form__welcome" variant="text" color="default">
                Configurar
            </Button>
            <img className="img__footer__login" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
        </main>
    )
}

export default Welcome
