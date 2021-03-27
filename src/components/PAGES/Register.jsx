import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})

const registerUser = e => {

    e.preventDefault()
    const form = e.target
    const data = {
        "name_user": form.nombre.value,
        "lastname_user": form.apellido.value,
        "password_user": form.pass.value,
        "email_user": form.correo.value
    }
    if (data.password_user === form.newpass.value) {
        axios.post('http://localhost:3001/v1/api/auth/register', data)
            .then(res => {
                console.log(res)
                window.location = '/login'
            }).catch(e => console.log(e))

    } else {
        console.log('error');
    }
}

const Register = () => {

    const classes = useStyle()

    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>

            <form onSubmit={registerUser.bind()} className="form__container">
                <h2 className="crear__contacto__title">Crear contacto</h2>

                <div className="container__form">

                    <TextField
                        className='input'
                        name='nombre'
                        id=""
                        label="Nombre"
                        variant="outlined"
                        margin="dense"
                        required />

                    <TextField
                        className='input'
                        name='apellido'
                        id=""
                        label="Apellido"
                        variant="outlined"
                        margin="dense"
                        required />

                    <TextField
                        className='input'
                        name='correo'
                        type='email'
                        id=""
                        label="Correo electrónico"
                        variant="outlined"
                        margin="dense"
                        required />

                    <TextField
                        className='input'
                        name='pass'
                        id=""
                        type="password"
                        label="Contraseña"
                        variant="outlined"
                        margin="dense"
                        required
                    />

                    <TextField
                        className='input'
                        name='newpass'
                        id=""
                        type="password"
                        label="Repetir contraseña"
                        variant="outlined"
                        margin="dense"
                        required
                    />

                </div>

                <div className='container__btn'>
                    <Button type='submit' className={`btn__card ${classes.color}`} variant="text" color="default">
                        Crear
                    </Button>
                </div>

                <div className="ya__tienes__cuenta">

                    <NavLink to="/login">
                        ¿Ya tienes cuenta? - Inicia sesión
                    </NavLink>



                </div>

            </form>

        </>
    )
}

export default Register
