import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import axios from 'axios'


const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})

const Login = ({ regions }) => {
    const classes = useStyle()


    const loginUser = e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "email_user": form.email.value,
            "password_user": form.passwordUser.value
        }
        axios.post('http://localhost:3001/v1/api/auth/login', data)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('welcome', res.data.data)
                localStorage.setItem('apellido', res.data.user.lastname_user)
                localStorage.setItem('name', res.data.user.name_user)
                localStorage.setItem('user', JSON.stringify(res.data.user.id_user))
                window.location = '/welcome'
            }).catch(e => {
                if (e) {
                    alert('Credenciales Inválidas')
                }
            })
    }


    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>

            <form onSubmit={loginUser.bind()} className="form__container__login">
                <h2 className="crear__contacto__title__login">Ingresar</h2>

                <div className="container__form__login">
                    <TextField
                        type='email'
                        className='input'
                        label="Correo electrónico"
                        variant="outlined"
                        margin="dense"
                        required
                        name='email'
                    />
                    <TextField
                        className='input'
                        name='passwordUser'
                        type="password"
                        label="Contraseña"
                        variant="outlined"
                        margin="dense"
                        required
                    />
                </div>

                <div className='container__btn form'>
                    <Button type='submit' className={`btn__card ${classes.color}`} variant="text" color="default">
                        Entrar
                    </Button>
                </div>

                <div className="ya__tienes__cuenta topLogin">
                    <NavLink to='/register'>
                        ¿No tienes cuentas? - Regístrate
                    </NavLink>

                </div>

            </form>


        </>
    )
}



export default Login
