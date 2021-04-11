import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Red from '@material-ui/core/colors/red'
import Indigo from '@material-ui/core/colors/indigo'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})



const columns = [
    { field: 'Nombre', headerName: 'Nombre', width: 150 },
    { field: 'Pais', headerName: 'País', width: 150 },
    { field: 'Direccion', headerName: 'Dirección', width: 150 },
    {
        field: 'Acciones',
        headerName: 'Acciones',
        width: 120,
        renderCell: (params) => (
            <strong>
                <Tooltip title='Eliminar'>
                    <IconButton>
                        <DeleteIcon style={{ color: Red[700] }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Editar'>
                    <IconButton>
                        <EditIcon style={{ color: Indigo[700] }} />
                    </IconButton>

                </Tooltip>
            </strong>
        ),
    },
];

const rows = [
    {
        id: 1,
        Nombre: 'Netflix',
        Pais: 'Chile',
        Direccion: 'Primo de rivera'
    }
];


const TableCompany = () => {
    const classes = useStyle()
    return (
        <>
            <h3>Compañías</h3>
            <div>
                <TextField className='busqueda' label="Filtrar" variant="outlined" margin="dense" />
                <NavLink to='/crear/company'>
                    <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                        Crear Compañía
                    </Button>

                </NavLink>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid loading={rows.length === 0} rows={rows} columns={columns} pageSize={7} checkboxSelection />
            </div>
        </>
    )
}

export default TableCompany
