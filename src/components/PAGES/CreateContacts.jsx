import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import { Avatar, makeStyles, TextField, ButtonGroup } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Sliderbtn from '../ATOMS/Sliderbtn';


const useStyle = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(10),
        paddingLeft: 300,
        position: 'relative',
        margin: 'auto',
        top: 30
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
    inputText: {
        position: 'relative',
        left: 10,
        margin: 10,
        width: 150
    },
    inputs: {
        position: 'relative'
    },
    slider: {
        position: 'relative',
        left: 20,
        marginTop: 50
    },
    avatar: {
        position: 'relative',
        margin: 'auto',
        width: 100
    },
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    },
    position: {
        marginLeft: 100,
        marginTop: 20
    }

}))


const CreateContacts = () => {
    const classes = useStyle()
    return (
        <>
            <NavbarUser />
            <Cajon />

            <main className={classes.content}>
                <h3 style={{ textAlign: 'center' }}>Crear tu contacto</h3>

                <div className={classes.avatar}>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />


                    <Avatar className={classes.absolute} src="https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png" />


                    <label className={`${classes.absolute} ${classes.camera}`} htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>

                </div>


                <div className='container__crear'>
                    <div className='container__main__crear'>
                        <div className={classes.inputs}>
                            <TextField className={classes.inputText} id="standard-basic" label="Nombre" size="small" required ></TextField>
                            <TextField className={classes.inputText} id="standard-basic" label="Apellido" size="small" required ></TextField>
                            <TextField className={classes.inputText} id="standard-basic" label="Cargo" size="small" required ></TextField>
                            <TextField className={classes.inputText} id="standard-basic" label="Email" type='email' size="small" required ></TextField>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                label="Compañías"
                                className={classes.inputText}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option /* key={option.value} */ /* value={option.value} */>
                                    Netflix
                                    </option>
                                <option /* key={option.value} */ /* value={option.value} */>
                                    Acámica
                                    </option>

                            </TextField>

                        </div>
                    </div>
                </div>

                <div className='container__body__inputs'>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="Region"
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" disabled selected/* key={option.value} */ /* value={option.value} */>
                            Region
                        </option>
                        <option /* key={option.value} */ /* value={option.value} */>
                            Netflix
                        </option>
                        <option /* key={option.value} */ /* value={option.value} */>
                            Acámica
                        </option>

                    </TextField>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="País"
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option /* key={option.value} */ /* value={option.value} */>
                            Netflix
                                    </option>
                        <option /* key={option.value} */ /* value={option.value} */>
                            Acámica
                                    </option>

                    </TextField>
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="Cuidad"
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option /* key={option.value} */ /* value={option.value} */>
                            Netflix
                                    </option>
                        <option /* key={option.value} */ /* value={option.value} */>
                            Acámica
                                    </option>

                    </TextField>
                    <TextField className={classes.inputText} id="standard-basic" label="Dirección" size="small" required ></TextField>
                    <div className={classes.slider}>
                        <Sliderbtn />
                    </div>

                    <div className={classes.slider}>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Canal de contacto"
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option /* key={option.value} */ /* value={option.value} */>
                                Whatsapp
                            </option>

                        </TextField>
                        <TextField className={classes.inputText} id="standard-basic" label="Cuenta de Usuario" size="small" required ></TextField>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Preferencias"
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option /* key={option.value} */ /* value={option.value} */>
                                No molestar
                            </option>

                        </TextField>
                        <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                            <Button className={`${classes.color}`} variant="text" >Crear</Button>
                            <Button className={`danger ${classes.color}`} variant="text" >Actualizar</Button>
                        </ButtonGroup>

                    </div>

                </div>
            </main>
        </>
    )
}

export default CreateContacts
