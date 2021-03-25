import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Red from '@material-ui/core/colors/red'
import Indigo from '@material-ui/core/colors/indigo'
import TextField from '@material-ui/core/TextField'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})



const columns = [
    {
        field: 'Avatar',
        headerName: ' ',
        width: 70,
        renderCell: (params) => (
            <strong>
                <Avatar alt="Remy Sharp" src={`${params.getValue('Avatar')}` || 'https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png'} />
            </strong>
        ),
    },
    { field: 'Contacto', headerName: 'Contacto', width: 130 },
    { field: 'Pais', headerName: 'País', width: 100 },
    { field: 'Compania', headerName: 'Compañía', width: 120 },
    { field: 'Cargo', headerName: 'Cargo', width: 100 },
    { field: 'Canal', headerName: 'Canal preferido', width: 160 },
    { field: 'Interes', headerName: 'Interés', width: 100 },
    {
        field: 'Acciones',
        headerName: 'Acciones',
        width: 120,
        renderCell: (params) => (
            <strong>
                <IconButton>
                    <DeleteIcon style={{ color: Red[700] }} />
                </IconButton>
                <IconButton>
                    <EditIcon style={{ color: Indigo[700] }} />
                </IconButton>
            </strong>
        ),
    },
];

const rows = [
    {
        id: 1,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 2,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 3,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 4,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 5,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 6,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 7,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 8,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 9,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 10,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    },
    {
        id: 1,
        Avatar: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519_1280.jpg',
        Contacto: 'Ifrain Medina',
        Pais: 'Venezuela',
        Compania: 'Acámica',
        Cargo: 'Gerente',
        Canal: 'Facebook',
        Interes: '100%',

    }

];


const Tables = () => {
    const classes = useStyle()
    return (
        <>
            <h3>Contactos</h3>
            <div>
                <TextField className='busqueda' id="" label="Filtrar" variant="outlined" margin="dense" />
                <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                    Crear Contacto
                </Button>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid loading={rows.length === 0} rows={rows} columns={columns} pageSize={7} checkboxSelection />
            </div>
        </>

    )
}

export default Tables
