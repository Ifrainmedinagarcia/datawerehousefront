import React, { useEffect } from 'react'
import { makeStyles, TextField, Button, ButtonGroup } from '@material-ui/core'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import store from '../../REDUX/store'
import { getUserByid } from '../../REDUX/actionsCreators'
import { connect } from 'react-redux'


const useStyle = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
        paddingLeft: 300,
        position: 'relative',
        margin: 'auto',
        top: 30
    },
    avatar: {
        position: 'relative',
        margin: 'auto',
        width: 100
    },
    input: {
        display: 'none',
        position: 'absolute',

    },
    absolute: {
        position: 'absolute',
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginLeft: 10,
        marginTop: 25,
        zIndex: 1
    },
    camera: {
        marginLeft: 40,
        marginTop: 45
    },
    contenedorText: {
        position: 'relative',
        margin: 'auto',
        top: 100,
        width: 150
    },
    inputText: {
        position: 'relative',
        left: 10,
        margin: 10,
        width: 150
    },
    position: {
        marginLeft: 100,
        marginTop: 15
    },
    color: {
        color: '#F7F9FC'
    },
}))

const nombre = localStorage.getItem('welcome')
const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')

const ProfileUser = (props) => {
    const classes = useStyle()
    useEffect(() => {
        store.dispatch(getUserByid())
    }, [])
    const urlPhoto = props.location.urlPhoto

    const [srcProps, setSrcProps] = React.useState(urlPhoto);
    const [idFoto, setIdFoto] = React.useState(null)

    const renderImage = async e => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = function () {
            let url = reader.result
            setSrcProps(url)
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSrcProps('https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png');
        }

        const formdata = new FormData();
        formdata.append("file", file)

        try {
            await axios.post('http://localhost:3001/v1/api/file/upload', formdata, {
                headers: {
                    'Authorization': JWT
                }
            }).then(res => {
                setIdFoto(res.data.data.id_photo)
            })
            await store.dispatch(getUserByid())
        } catch (error) {
            if (error) {
                alert('El tamaño de la imagen supera los 2MB, por favor elegir una foto menor a 2MB')
                setSrcProps('https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png')
            }

        }
    }

    const updateUser = async e => {
        e.preventDefault()
        const data = {
            "id_photo": idFoto
        }

        try {
            await axios.put(`http://localhost:3001/v1/api/users/${userId}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
            })
            await store.dispatch(getUserByid())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <div className={classes.avatar}>
                    <input onChange={renderImage} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    {
                        srcProps !== undefined ?
                            <img style={{ borderRadius: '200px' }} className={classes.absolute} src={srcProps} alt='imageProfile' />
                            : <img style={{ borderRadius: '200px' }} className={classes.absolute} src='https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png' alt='imageProfile' />
                    }
                    <label className={`${classes.absolute} ${classes.camera}`} htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>

                </div>
                <div className={classes.contenedorText}>
                    <p style={{ textAlign: 'center' }}>{nombre}</p>
                </div>

                <form onSubmit={updateUser.bind()} className='contenedorInfo'>
                    <TextField
                        className={classes.inputText}
                        label="Ifrain David"
                        size="small"
                        selected
                        disabled
                    >
                    </TextField>
                    <TextField
                        className={classes.inputText}
                        label="Medina García"
                        size="small"
                        selected
                        disabled
                    >
                    </TextField>
                    <TextField
                        className={classes.inputText}
                        label='Admin'
                        size="small"
                        selected
                        disabled
                    >
                    </TextField>
                    <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                        <Button type='submit' className={`${classes.color}`} variant="text" >Actualizar</Button>
                    </ButtonGroup>
                </form>
            </main>

        </>
    )
}

const mapStateToProps = state => ({
    users: state.usersReducer.users
})

export default connect(mapStateToProps, {})(ProfileUser)