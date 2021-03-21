import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from '@material-ui/core'

const Login = () => {
    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>

            <form className="form__container__login">
                <h2 className="crear__contacto__title__login">Ingresar</h2>

                <div className="container__form__login">
                    <TextField className='input' id="" label="Correo electrónico" variant="outlined" margin="dense" />
                    <TextField className='input' id="" type="password" label="Contraseña" variant="outlined" margin="dense" />
                </div>

                <Button className="btn_form_create" variant="text" color="default">
                    Entrar
                </Button>

            </form>
            <Link className="ya__tienes__cuenta" href="/register">¿No tienes cuentas? - Regístrate</Link>

        </>
    )
}

export default Login
