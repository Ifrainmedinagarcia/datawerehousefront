import React, { useEffect } from 'react'
import { makeStyles, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Indigo from '@material-ui/core/colors/indigo'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllCompanies, getAllContacts } from '../../REDUX/actionsCreators'
import SpringModal from '../ATOMS/SpringModal'
import SimpleBackdrop from '../ATOMS/SimpleBackdrop'
import CustomizedSnackbars from '../ATOMS/CustomizedSnackbars'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})


const JWT = localStorage.getItem('token')

const TableCompany = ({ companies }) => {
    const classes = useStyle()
    useEffect(() => {
        store.dispatch(getAllCompanies())
        store.dispatch(getAllContacts())
    }, [])

    const [loader, setLoader] = React.useState(false)

    const [message, setMessage] = React.useState(false)

    let rows = []
    const [filterRowsCompany, setFilterRowsCompany] = React.useState([])
    const [idFullCompany, setIdFullCompany] = React.useState([])

    const deleteFull = async () => {
        try {
            setLoader(true)
            setMessage(false)
            idFullCompany.forEach((element, index) => {
                axios.delete(`https://datawerehouse.herokuapp.com/v1/api/companies/${element}`, {
                    headers: { 'Authorization': JWT }
                })
                    .then(res => {
                        setIdFullCompany([])
                        setMessage(true)
                        store.dispatch(getAllCompanies())
                        store.dispatch(getAllContacts())
                    })
            })
            await store.dispatch(getAllCompanies())
            await store.dispatch(getAllContacts())
        } catch (error) {
            alert('Ha ocurrido un error')
        }
        finally {
            setLoader(false)
        }
    }

    const deleteCompany = async id => {
        try {
            setLoader(true)
            setMessage(false)
            await axios.delete(`https://datawerehouse.herokuapp.com/v1/api/companies/${id}`, {
                headers: { 'Authorization': JWT }
            }).then(res => {
                setIdFullCompany([])
                setMessage(true)
            })
            await store.dispatch(getAllCompanies())
            await store.dispatch(getAllContacts())
        } catch (error) {
            alert('ha ocurrido un error')
        }
        finally {
            setLoader(false)
        }
    }

    const columns = [
        { field: 'name_company', headerName: 'Nombre', width: 150 },
        { field: 'name_country', headerName: 'País', width: 150 },
        { field: 'address', headerName: 'Dirección', width: 150 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 120,
            renderCell: (params) => (
                <>
                    <SpringModal
                        description='Si Eliminas esta compañía estarías eliminando todos los contactos que dependen de ella'
                        eliminar={() => deleteCompany(params.id)}
                    />

                    <Link style={{ background: 'transparent' }} to={{
                        pathname: '/update/company',
                        id: params.row.id,
                        valueNameCompany: params.row.name_company,
                        addressValue: params.row.address,
                        valueCountry: params.row.name_country
                    }}>
                        <Tooltip title='Editar'>
                            <IconButton>
                                <EditIcon style={{ color: Indigo[700] }} />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </>
            ),
        },
    ]

    companies.map(c => {
        return rows.push({
            id: c.id_company,
            name_company: c.name_company,
            name_country: c.Country.name_country,
            address: c.address
        })
    })

    const checkBox = async e => {
        setIdFullCompany(e.selectionModel)
    }

    const filterTableContact = (e) => {
        const valueInput = e.target.value.toLowerCase()

        for (let company of companies) {
            let name = company.name_company.toLowerCase()
            let country = company.Country.name_country.toLowerCase()


            if (name.indexOf(valueInput) !== -1) {
                let filter = rows.filter(row => row.name_company.toLowerCase() === company.name_company.toLowerCase())
                setFilterRowsCompany(filter)
            }

            if (country.indexOf(valueInput) !== -1) {
                const filterCountry = rows.filter(row => row.name_country.toLowerCase() === company.Country.name_country.toLowerCase())
                setFilterRowsCompany(filterCountry)
            }

            if (valueInput === '') {
                setFilterRowsCompany([])
            }
        }
    }

    return (
        <>
            <h3>Compañías</h3>
            {
                loader ?
                    <SimpleBackdrop />
                    : ''
            }
            {
                message ?
                    <CustomizedSnackbars
                        message='Compañía eliminada con éxito'
                    />
                    : ''
            }
            <div>
                <TextField
                    className='busqueda'
                    label="Filtrar"
                    variant="outlined"
                    margin="dense"
                    onChange={filterTableContact}
                />
                <NavLink to='/crear/company'>
                    <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                        Crear Compañía
                    </Button>
                </NavLink>
                <span>
                    {
                        idFullCompany.length !== 0 ?
                            <>
                                <SpringModal
                                    description='Si Eliminas estas compañías estarías eliminando todos los contactos que dependen de ellas'
                                    eliminar={() => deleteFull()}
                                />

                            </>
                            : ''
                    }

                </span>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                {
                    filterRowsCompany.length !== 0 ?
                        < DataGrid
                            rows={filterRowsCompany}
                            columns={columns}
                            pageSize={7}
                            checkboxSelection
                            onChange={checkBox}
                        />
                        : <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={7}
                            checkboxSelection
                            onSelectionModelChange={checkBox}
                        />
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    companies: state.companiesReducer.companies
})
export default connect(mapStateToProps, {})(TableCompany)
