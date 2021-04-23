import React, { useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import Indigo from '@material-ui/core/colors/indigo'
import AddIcon from '@material-ui/icons/Add'
import blue from '@material-ui/core/colors/blue';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../REDUX/store';
import { getAllcities, getAllCompanies, getAllContacts, getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import SpringModal from './SpringModal';
import CustomizedSnackbars from '../ATOMS/CustomizedSnackbars'
const JWT = localStorage.getItem('token')


const AcordionRegion = ({ idRegion, labelRegion, countries }) => {
    useEffect(() => {
        store.dispatch(getAllCountries())
        store.dispatch(getAllcities())
        store.dispatch(getAllRegions())
        store.dispatch(getAllContacts())
        store.dispatch(getAllCompanies())
    }, [])
    const [message, setMessage] = React.useState(false)
    const deleteRegion = async (id, path) => {
        try {
            setMessage(false)
            await axios.delete(`https://datawerehouse.herokuapp.com/v1/api/${path}/${id}`, {
                headers: { 'Authorization': JWT }
            })
                .then(res => {
                    setMessage(true)
                })
            await store.dispatch(getAllRegions())
            await store.dispatch(getAllContacts())
            await store.dispatch(getAllCountries())
            await store.dispatch(getAllCompanies())
            await store.dispatch(getAllcities())
        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
        }
    }

    return (
        <>
            {
                message ?
                    <CustomizedSnackbars
                        message='Región Eliminada con éxito'
                    />
                    : ''
            }
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id={idRegion}
                >
                    {
                        labelRegion !== undefined ?
                            <FormControlLabel
                                style={{ marginLeft: '20px' }}
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox style={{ display: 'none' }} />}
                                label={labelRegion}
                            />
                            : <FormControlLabel
                                style={{ marginLeft: '20px' }}
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox style={{ display: 'none' }} />}
                                label='Aún no hay Regiones ingresadas'
                            />
                    }
                    {
                        labelRegion !== undefined ?

                            <SpringModal
                                description='Si eliminas esta región estarías eliminando todo lo que depende de ella (Ciudad/Países/Compañías/Contactos)'
                                eliminar={() => deleteRegion(idRegion, 'regions')}
                            />

                            : ''
                    }

                    {
                        labelRegion !== undefined ?
                            <Link to={{
                                pathname: '/edit/region',
                                id: idRegion,
                                value: labelRegion
                            }}>
                                <Tooltip title='Editar'>
                                    <IconButton >
                                        <EditIcon style={{ color: Indigo[700] }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            : ''
                    }

                    <Link to='/agregar/region'>
                        <Tooltip title='Agregar'>
                            <IconButton>
                                <AddIcon style={{ color: blue[700] }} />
                            </IconButton>
                        </Tooltip>
                    </Link>

                </AccordionSummary>
                {
                    !countries ?
                        <Typography style={{ marginLeft: '20px' }} variant='h6'>
                            No hay Países
                                <Link to='/add/country'>
                                <Tooltip title='Agregar'>
                                    <IconButton>
                                        <AddIcon style={{ color: blue[700] }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Typography>

                        : countries.length !== 0 ?
                            countries.map(c => (
                                <AccordionDetails key={c.id_country.toString()}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-label="Expand"
                                            aria-controls="additional-actions1-content"
                                            id={c.id_country}
                                        >
                                            <FormControlLabel
                                                style={{ marginLeft: '20px' }}
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<Checkbox style={{ display: 'none' }} />}
                                                label={c.name_country}
                                            />
                                            <SpringModal
                                                description='Si eliminas esta país estarías eliminando todo lo que depende de el (/Compañías/Contactos)'
                                                eliminar={() => deleteRegion(c.id_country, 'countries')}
                                            />

                                            <Link to={{
                                                pathname: '/editar/country',
                                                id: c.id_country,
                                                labelCountry: c.name_country,
                                                labelRegion: labelRegion,
                                                idRegion: idRegion
                                            }}>
                                                <Tooltip title='Editar'>
                                                    <IconButton>
                                                        <EditIcon style={{ color: Indigo[700] }} />
                                                    </IconButton>
                                                </Tooltip>

                                            </Link>


                                            <Link to='/add/country'>
                                                <Tooltip title='Agregar'>
                                                    <IconButton>
                                                        <AddIcon style={{ color: blue[700] }} />
                                                    </IconButton>
                                                </Tooltip>

                                            </Link>

                                        </AccordionSummary>
                                        {
                                            !c.City ?
                                                <Typography variant='h6' style={{ marginLeft: '20px' }}>
                                                    No hay ciudades
                                            <Link to='/ingresar/city'>
                                                        <Tooltip title='Agregar'>
                                                            <IconButton>
                                                                <AddIcon style={{ color: blue[700] }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                </Typography>

                                                : c.City.length !== 0 ?
                                                    c.City.map(t => (
                                                        <AccordionDetails key={t.id_city.toString()}>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    aria-label="Expand"
                                                                    aria-controls="additional-actions1-content"
                                                                    id={t.id_city}

                                                                >
                                                                    <FormControlLabel
                                                                        style={{ marginLeft: '20px' }}
                                                                        aria-label="Acknowledge"
                                                                        onClick={(event) => event.stopPropagation()}
                                                                        onFocus={(event) => event.stopPropagation()}
                                                                        control={<Checkbox style={{ display: 'none' }} />}
                                                                        label={t.name_city}
                                                                    />
                                                                    <SpringModal
                                                                        description='Si eliminas esta ciudad estarías eliminando todo lo que depende de ella (Compañías/Contactos)'
                                                                        eliminar={() => deleteRegion(t.id_city, 'cities')}
                                                                    />


                                                                    <Link to={{
                                                                        pathname: '/modificar/city',
                                                                        labelCountry: c.name_country,
                                                                        id: t.id_city,
                                                                        valueInputCity: t.name_city
                                                                    }}>
                                                                        <Tooltip title='Editar'>
                                                                            <IconButton>
                                                                                <EditIcon style={{ color: Indigo[700] }} />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                    </Link>


                                                                    <Link to='/ingresar/city'>
                                                                        <Tooltip title='Agregar'>
                                                                            <IconButton>
                                                                                <AddIcon style={{ color: blue[700] }} />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                    </Link>

                                                                </AccordionSummary>
                                                            </Accordion>
                                                        </AccordionDetails>
                                                    ))
                                                    : <Typography variant='h6' style={{ marginLeft: '20px' }}>
                                                        No hay Ciudades
                                                    <Link to='/ingresar/city'>
                                                            <Tooltip title='Agregar'>
                                                                <IconButton>
                                                                    <AddIcon style={{ color: blue[700] }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Link>
                                                    </Typography>
                                        }
                                    </Accordion>
                                </AccordionDetails>
                            ))
                            : <Typography style={{ marginLeft: '20px' }} variant='h6'>
                                No hay Países
                            <Link to='/add/country'>
                                    <Tooltip title='Agregar'>
                                        <IconButton>
                                            <AddIcon style={{ color: blue[700] }} />
                                        </IconButton>
                                    </Tooltip>
                                </Link>

                            </Typography>
                }
            </Accordion>

        </>

    )
}

const mapStateToProps = state => ({
    cities: state.cityReducer.cities
})

export default connect(mapStateToProps, {})(AcordionRegion)
