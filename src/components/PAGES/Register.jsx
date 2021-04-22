import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})

const Register = () => {
    const [passError, setPassError] = React.useState(false)

    const registerUser = async e => {

        e.preventDefault()
        const form = e.target
        const data = {
            "name_user": form.nombre.value,
            "lastname_user": form.apellido.value,
            "password_user": form.pass.value,
            "email_user": form.correo.value
        }
        try {
            setPassError(false)
            if (data.password_user === form.newpass.value) {
                await axios.post('http://localhost:3001/v1/api/auth/register', data)
                    .then(res => {
                        console.log(res)
                        window.location = '/login'
                    })

            } else {
                setPassError(true)
            }
        } catch (error) {

            if (error.response.data.error.name === 'SequelizeUniqueConstraintError') {
                alert('Ususario ya existe, por favor inicie sesión')
            } else {
                alert('Error inesperado del servidor')
            }
        }

    }

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

                        label="Nombre"
                        variant="outlined"
                        margin="dense"
                        required />

                    <TextField
                        className='input'
                        name='apellido'

                        label="Apellido"
                        variant="outlined"
                        margin="dense"
                        required />

                    <TextField
                        className='input'
                        name='correo'
                        type='email'

                        label="Correo electrónico"
                        variant="outlined"
                        margin="dense"
                        required />

                    {
                        passError ?
                            <TextField
                                className='input'
                                name='pass'
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                margin="dense"
                                required
                                error
                            />
                            : <TextField
                                className='input'
                                name='pass'
                                type="password"
                                label="Contraseña"
                                variant="outlined"
                                margin="dense"
                                required
                            />
                    }
                    {
                        passError ?
                            <TextField
                                className='input'
                                name='newpass'
                                type="password"
                                error
                                helperText="Las contraseñas deben ser iguales"
                                label="Repetir contraseña"
                                variant="outlined"
                                margin="dense"
                                required
                            />
                            : <TextField
                                className='input'
                                name='newpass'
                                type="password"
                                label="Repetir contraseña"
                                variant="outlined"
                                margin="dense"
                                required
                            />

                    }



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
