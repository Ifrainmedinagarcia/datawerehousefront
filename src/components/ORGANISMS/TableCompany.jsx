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
import { connect } from 'react-redux';

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})

const JWT = localStorage.getItem('token')

const columns = [
    { field: 'name_company', headerName: 'Nombre', width: 150 },
    { field: 'name_country', headerName: 'País', width: 150 },
    { field: 'address', headerName: 'Dirección', width: 150 },
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


const TableCompany = ({ companies }) => {
    const classes = useStyle()
    let rows = []
    const [filterRows, setFilterRows] = React.useState([])

    companies.map(c => {
        console.log(c)
        rows.push({
            id: c.id_company,
            name_company: c.name_company,
            name_country: c.Country.name_country,
            address: c.address
        })
    })

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
                <DataGrid /* loading={rows.length === 0} */ rows={rows} columns={columns} pageSize={7} checkboxSelection />
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    companies: state.companiesReducer.companies
})
export default connect(mapStateToProps, {})(TableCompany)
