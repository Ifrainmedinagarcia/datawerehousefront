import React from 'react'
import Button from '@material-ui/core/Button'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})

const nombre = localStorage.getItem('welcome')

const Welcome = () => {
    const classes = useStyle()

    return (
        <main className="main">
            <TitleWelcomeForm
                title={` ${nombre} Antes de empezar debes configurar tu cuenta`}
            />

            <Button href='/region/config' className={`btn__card form__welcome ${classes.color}`} variant="text" color="default">
                Configurar
            </Button>


            <img className="img__footer__login" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
        </main>
    )
}

export default Welcome
