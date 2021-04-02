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
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store from '../../REDUX/store'
import { getAllContacts } from '../../REDUX/actionsCreators'


store.dispatch(getAllContacts())


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
    { field: 'name_contact', headerName: 'Contacto', width: 130 },
    { field: 'name_country', headerName: 'País', width: 100 },
    { field: 'company', headerName: 'Compañía', width: 120 },
    { field: 'position', headerName: 'Cargo', width: 100 },
    { field: 'channel', headerName: 'Canal preferido', width: 160 },
    { field: 'commiment', headerName: 'Interés', width: 100 },
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
]

const Tables = ({ contacts }) => {
    const classes = useStyle()

    const [rows, setRows] = React.useState(contacts)

    return (
        <>
            <h3>Contactos</h3>
            <div>
                <TextField className='busqueda' id="" label="Filtrar" variant="outlined" margin="dense" />
                <Link to='/create/contact'>
                    <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                        Crear Contacto
                    </Button>
                </Link>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection />
            </div>
        </>

    )
}

const mapStateToProps = state => ({
    contacts: state.contactsReducer.contacts

})


export default connect(mapStateToProps, {})(Tables)
