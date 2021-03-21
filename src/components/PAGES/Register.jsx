import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from '@material-ui/core';


const Register = () => {
    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>


            <form className="form__container">
                <h2 className="crear__contacto__title">Crear contacto</h2>

                <div className="container__form">

                    <TextField className='input' id="" label="Nombre" variant="outlined" margin="dense" />

                    <TextField className='input' id="" label="Apellido" variant="outlined" margin="dense" />

                    <TextField className='input' id="" label="Correo electrónico" variant="outlined" margin="dense" />

                    <TextField className='input' id="" type="password" label="Contraseña" variant="outlined" margin="dense" />

                    <TextField className='input' id="" type="password" label="Repetir contraseña" variant="outlined" margin="dense" />


                </div>
                <Button className="btn_form_create" variant="text" color="default">
                    Crear
                </Button>



            </form>
                <Link className="ya__tienes__cuenta" href="/login">¿Ya tienes cuenta? - Inicia sesión</Link>

        </>
    )
}

export default Register
