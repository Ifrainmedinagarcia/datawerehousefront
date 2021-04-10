import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import Red from '@material-ui/core/colors/red'
import Indigo from '@material-ui/core/colors/indigo'
import AddIcon from '@material-ui/icons/Add'
import blue from '@material-ui/core/colors/blue';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../REDUX/store';
import { getAllcities, getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
import axios from 'axios';
store.dispatch(getAllCountries())
store.dispatch(getAllcities())
store.dispatch(getAllRegions())

const JWT = localStorage.getItem('token')

const deleteRegion = async (id, path) => {
    await axios.delete(`http://localhost:3001/v1/api/${path}/${id}`, {
        headers: { 'Authorization': JWT }
    })
        .then(res => {
            console.log(res)
        }).catch(e => console.log(e))
    await store.dispatch(getAllRegions())
}


const AcordionRegion = ({ idRegion, labelRegion, countries }) => {
    return (
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
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox />}
                            label={labelRegion}
                        />
                        : <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox />}
                            label='Aún no hay Regiones ingresadas'
                        />

                }
                {
                    labelRegion !== undefined ?
                        <Tooltip title='Eliminar'>
                            <IconButton onClick={() => deleteRegion(idRegion, 'regions')}>
                                <DeleteIcon style={{ color: Red[700] }} />
                            </IconButton>
                        </Tooltip>
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
                    <h5>No hay Países
                        <Link to='/add/country'>
                            <Tooltip title='Agregar'>
                                <IconButton>
                                    <AddIcon style={{ color: blue[700] }} />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </h5>
                    : countries.length !== 0 ?
                        countries.map(c => (
                            <AccordionDetails>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id={c.id_country}
                                    >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label={c.name_country}
                                        />
                                        <Tooltip title='Eliminar'>
                                            <IconButton onClick={() => deleteRegion(c.id_country, 'countries')}>
                                                <DeleteIcon style={{ color: Red[700] }} />
                                            </IconButton>
                                        </Tooltip>

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
                                            <h5>No hay ciudades
                                            <Link to='/ingresar/city'>
                                                    <Tooltip title='Agregar'>
                                                        <IconButton>
                                                            <AddIcon style={{ color: blue[700] }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                            </h5>
                                            : c.City.length !== 0 ?
                                                c.City.map(t => (
                                                    <AccordionDetails>
                                                        <Accordion>
                                                            <AccordionSummary
                                                                aria-label="Expand"
                                                                aria-controls="additional-actions1-content"
                                                                id={t.id_city}
                                                            >
                                                                <FormControlLabel
                                                                    aria-label="Acknowledge"
                                                                    onClick={(event) => event.stopPropagation()}
                                                                    onFocus={(event) => event.stopPropagation()}
                                                                    control={<Checkbox />}
                                                                    label={t.name_city}
                                                                />
                                                                <Tooltip title='Eliminar'>
                                                                    <IconButton onClick={() => deleteRegion(t.id_city, 'cities')}>
                                                                        <DeleteIcon style={{ color: Red[700] }} />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Link to='/ingresar/city'>
                                                                    <Tooltip title='Editar'>
                                                                        <IconButton>
                                                                            <EditIcon style={{ color: Indigo[700] }} />
                                                                        </IconButton>
                                                                    </Tooltip>

                                                                </Link>


                                                                <Link to={{
                                                                    pathname:'/modificar/city',
                                                                    labelCountry: c.name_country,
                                                                }}>
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
                                                : <h5>No hay ciudades
                                                    <Link to='/ingresar/city'>
                                                        <Tooltip title='Agregar'>
                                                            <IconButton>
                                                                <AddIcon style={{ color: blue[700] }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                </h5>
                                    }
                                </Accordion>
                            </AccordionDetails>
                        ))
                        : <h5>No hay Países
                            <Link to='/add/country'>
                                <Tooltip title='Agregar'>
                                    <IconButton>
                                        <AddIcon style={{ color: blue[700] }} />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </h5>

            }

        </Accordion>
    )
}

const mapStateToProps = state => ({
    cities: state.cityReducer.cities
})

export default connect(mapStateToProps, {})(AcordionRegion)
