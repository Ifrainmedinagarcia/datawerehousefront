import React from 'react'
import { Avatar, makeStyles, TextField, Button, ButtonGroup } from '@material-ui/core'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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

const ProfileUser = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />
            <main className={classes.content}>
                <div className={classes.avatar}>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />


                    <Avatar className={`${classes.absolute}`} src="https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png" />


                    <label className={`${classes.absolute} ${classes.camera}`} htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>

                </div>
                <div className={classes.contenedorText}>
                    <p>Nombre de usuario</p>
                </div>

                <div className='contenedorInfo'>
                    <TextField className={classes.inputText} id="standard-basic" label="Ifrain David" size="small" selected></TextField>
                    <TextField className={classes.inputText} id="standard-basic" label="Medina García" size="small" selected></TextField>
                    <TextField className={classes.inputText} id="standard-basic" label='Admin' size="small" selected disabled></TextField>
                    <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                        <Button className={`${classes.color}`} variant="text" >Actualizar</Button>
                    </ButtonGroup>
                </div>
            </main>

        </>
    )
}

export default ProfileUser
