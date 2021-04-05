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
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../REDUX/store';
import { getAllcities, getAllCountries } from '../../REDUX/actionsCreators';
store.dispatch(getAllCountries())
store.dispatch(getAllcities())


const AcordionRegion = ({ idRegion, labelRegion, countries }) => {
    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id={idRegion}
            >
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox />}
                    label={labelRegion}
                />

                <Tooltip title='Eliminar'>
                    <IconButton>
                        <DeleteIcon style={{ color: Red[700] }} />
                    </IconButton>
                </Tooltip>


                <NavLink to='/agregar/region'>
                    <Tooltip title='Editar'>
                        <IconButton>
                            <EditIcon style={{ color: Indigo[700] }} />
                        </IconButton>
                    </Tooltip>
                </NavLink>



                <NavLink to='/agregar/region'>
                    <Tooltip title='Agregar'>
                        <IconButton>
                            <AddIcon style={{ color: blue[700] }} />
                        </IconButton>
                    </Tooltip>
                </NavLink>


            </AccordionSummary>

            {
                countries.length !== 0 ?
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
                                        <IconButton>
                                            <DeleteIcon style={{ color: Red[700] }} />
                                        </IconButton>
                                    </Tooltip>


                                    <NavLink to='/add/country'>
                                        <Tooltip title='Editar'>
                                            <IconButton>
                                                <EditIcon style={{ color: Indigo[700] }} />
                                            </IconButton>
                                        </Tooltip>

                                    </NavLink>


                                    <NavLink to='/add/country'>
                                        <Tooltip title='Agregar'>
                                            <IconButton>
                                                <AddIcon style={{ color: blue[700] }} />
                                            </IconButton>
                                        </Tooltip>

                                    </NavLink>

                                </AccordionSummary>
                                {
                                    c.City.length !== 0 ?
                                        c.City.map(c => (
                                            <AccordionDetails>
                                                <Accordion>
                                                    <AccordionSummary
                                                        aria-label="Expand"
                                                        aria-controls="additional-actions1-content"
                                                        id={c.id_city}
                                                    >
                                                        <FormControlLabel
                                                            aria-label="Acknowledge"
                                                            onClick={(event) => event.stopPropagation()}
                                                            onFocus={(event) => event.stopPropagation()}
                                                            control={<Checkbox />}
                                                            label={c.name_city}
                                                        />


                                                        <Tooltip title='Eliminar'>
                                                            <IconButton>
                                                                <DeleteIcon style={{ color: Red[700] }} />
                                                            </IconButton>
                                                        </Tooltip>


                                                        <NavLink to='/ingresar/city'>
                                                            <Tooltip title='Editar'>
                                                                <IconButton>
                                                                    <EditIcon style={{ color: Indigo[700] }} />
                                                                </IconButton>
                                                            </Tooltip>

                                                        </NavLink>


                                                        <NavLink to='/ingresar/city'>
                                                            <Tooltip title='Agregar'>
                                                                <IconButton>
                                                                    <AddIcon style={{ color: blue[700] }} />
                                                                </IconButton>
                                                            </Tooltip>

                                                        </NavLink>

                                                    </AccordionSummary>
                                                </Accordion>
                                            </AccordionDetails>
                                        ))
                                        : <h5>No hay ciudades
                                            <NavLink to='/ingresar/city'>
                                                <Tooltip title='Agregar'>
                                                    <IconButton>
                                                        <AddIcon style={{ color: blue[700] }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </NavLink>
                                        </h5>
                                }
                            </Accordion>
                        </AccordionDetails>
                    ))
                    : <h5>No hay Países
                    <NavLink to='/ingresar/city'>
                            <Tooltip title='Agregar'>
                                <IconButton>
                                    <AddIcon style={{ color: blue[700] }} />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    </h5>

            }

        </Accordion>
    )
}

const mapStateToProps = state => ({
    cities: state.cityReducer.cities
})

export default connect(mapStateToProps, {})(AcordionRegion)
