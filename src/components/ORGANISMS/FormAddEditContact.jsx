import React from 'react'
import { Avatar, makeStyles, TextField, ButtonGroup, AccordionSummary } from '@material-ui/core'
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

const FormAddEditContact = (
    {
        title,
        functionSubmit,
        nombreValue,
        apellidoValue,
        cargoValue,
        correoValue,
        companyValue,
        regionValue,
        countryValue,
        cityValue,
        addressValue,
        channelValue,
        cuentaValue,
        preferenceValue,
        defaultValue,
        regions,
        preferences,
        companies,
        channels,
        allRegion,
        allCountry,
        renderImage,
        CityFromCountry,
        countryFromRegion,
        src,
        nameBtn
    }
) => {

    const classes = useStyle()

    return (
        <form onSubmit={functionSubmit} className={classes.content} encType='multipart/form-data'>
            <h3 style={{ textAlign: 'center' }}>{title}</h3>
            <div className={classes.avatar}>
                <input name='image' onChange={renderImage} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <img style={{ borderRadius: '200px' }} className={classes.absolute} src={src} />
                <label className={`${classes.absolute} ${classes.camera}`} htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <div className='container__crear'>
                <div className='container__main__crear'>
                    <div className={classes.inputs}>
                        <TextField
                            name='nombre'
                            className={classes.inputText}
                            label={nombreValue}
                            size="small"
                        >
                        </TextField>
                        <TextField
                            name='apellido'
                            className={classes.inputText}
                            label={apellidoValue}
                            size="small"
                        >
                        </TextField>
                        <TextField
                            name='cargo'
                            className={classes.inputText}
                            label={cargoValue}
                            size="small"
                        >
                        </TextField>
                        <TextField
                            name='correo'
                            className={classes.inputText}
                            label={correoValue}
                            type='email'
                            size="small"
                        >
                        </TextField>
                        <TextField
                            name='compania'
                            select
                            name='idComany'
                            label={companyValue}
                            className={classes.inputText}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option aria-label="None" value="" selected></option>
                            {
                                companies.length !== 0 ?
                                    companies.map(c => (
                                        <option key={c.id_company} value={c.id_company}>
                                            {c.name_company}
                                        </option>
                                    ))
                                    : <option>Aun no hay compañías ingresadas</option>

                            }
                        </TextField>
                    </div>
                </div>
            </div>

            <div className='container__body__inputs'>
                <TextField
                    select
                    name='idRegion'
                    label={regionValue}
                    onChange={countryFromRegion}
                    className={classes.inputText}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option aria-label="None" value="" selected></option>
                    {
                        regions.length !== 0 ?
                            regions.map(r => (
                                <option key={r.id_region} value={r.id_region}>
                                    {r.name_region}
                                </option>
                            ))
                            : <option>
                                Debe configurar una ciudad
                        </option>
                    }
                </TextField>
                <TextField
                    name
                    select
                    onChange={CityFromCountry}
                    label={countryValue}
                    name='idCountry'
                    className={classes.inputText}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option aria-label="None" value="" selected></option>
                    {
                        allRegion.data !== undefined ?
                            allRegion.data.data.Paises.map(c => (
                                <option key={c.id_country} value={c.id_country}>
                                    {c.name_country}
                                </option>

                            ))
                            : <option>Debes agregar un país</option>
                    }
                </TextField>
                <TextField
                    select
                    name='idCity'
                    label={cityValue}
                    className={classes.inputText}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option aria-label="None" value="" selected></option>
                    {
                        allCountry.data !== undefined ?
                            allCountry.data.data.City.map(c => (
                                <option key={c.id_city} value={c.id_city}>
                                    {c.name_city}
                                </option>
                            ))
                            : <option disabled>Debes agregar un ciudad</option>
                    }

                </TextField>
                <TextField
                    className={classes.inputText}
                    label={addressValue}
                    size="small"
                    name='address'
                >
                </TextField>
                <div className={classes.slider}>
                    <Sliderbtn defaultValue={defaultValue} name='sliderCommitment' />
                </div>

                <div className={classes.slider}>
                    <TextField
                        select
                        name='idChannel'
                        label={channelValue}
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" selected></option>

                        {
                            channels.length !== 0 ?
                                channels.map(c => (
                                    <option key={c.id_channel_comunication} value={c.id_channel_comunication}>
                                        {c.name_channel}
                                    </option>
                                ))
                                : <option>Hay un error, recarge la página</option>
                        }

                    </TextField>
                    <TextField
                        name='cuenta'
                        className={classes.inputText}
                        label={cuentaValue}
                        size="small"
                    >
                    </TextField>
                    <TextField
                        name='preferencia'
                        select
                        label={preferenceValue}
                        className={classes.inputText}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option aria-label="None" value="" selected></option>
                        {
                            preferences.length !== 0 ?
                                preferences.map(p => (
                                    <option key={p.id_preference} value={p.id_preference}>
                                        {p.name_preference}
                                    </option>

                                ))
                                : <option>Hay un error, recargue la página</option>
                        }

                    </TextField>
                    <ButtonGroup className={`btn__action ${classes.position}`} variant="text" aria-label="">
                        <Button type='submit' className={`${classes.color}`} variant="text" >{nameBtn}</Button>
                    </ButtonGroup>
                </div>

            </div>
        </form>
    )
}

export default FormAddEditContact
