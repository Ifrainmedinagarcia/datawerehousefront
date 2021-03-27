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


const AcordionRegion = ({ idRegion, labelRegion, idCountry, labelCountry, idCity, labelCity }) => {
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
            <AccordionDetails>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id={idCountry}
                    >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox />}
                            label={labelCountry}
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
                    <AccordionDetails>
                        <Accordion>
                            <AccordionSummary
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id={idCity}
                            >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox />}
                                    label={labelCity}
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
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                    </AccordionDetails>
                </Accordion>


            </AccordionDetails>
        </Accordion>
    )
}

export default AcordionRegion
