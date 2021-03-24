import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})


const Login = () => {
    const classes = useStyle()
    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>

            <form className="form__container__login">
                <h2 className="crear__contacto__title__login">Ingresar</h2>

                <div className="container__form__login">
                    <TextField className='input' id="" label="Correo electrónico" variant="outlined" margin="dense" required />
                    <TextField className='input' id="" type="password" label="Contraseña" variant="outlined" margin="dense" required />
                </div>

                <div className='container__btn form'>
                    <Button className={`btn__card ${classes.color}`} variant="text" color="default">
                        Entrar
                    </Button>
                </div>

            </form>
            <Link className="ya__tienes__cuenta" href="/register">¿No tienes cuentas? - Regístrate</Link>

        </>
    )
}

export default Login
