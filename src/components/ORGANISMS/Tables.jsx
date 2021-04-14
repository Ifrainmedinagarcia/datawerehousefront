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
import axios from 'axios'
store.dispatch(getAllContacts())

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    },
    top: {
        marginTop: 15
    }
})

const JWT = localStorage.getItem('token')

const deleteContact = async id => {
    try {
        await axios.delete(`http://localhost:3001/v1/api/contacts/${id}`, {
            headers: { 'Authorization': JWT }
        }).then(res => {
            console.log(res)
        })
        await store.dispatch(getAllContacts())
    } catch (error) {
        console.log(error)
    }
}

const columns = [
    {
        field: 'urlPhoto_contact',
        headerName: ' ',
        width: 70,
        renderCell: (params) => (
            <strong>
                <Avatar alt="Remy Sharp" src={`${params.getValue('urlPhoto_contact')}` || 'https://imageprofileproject.s3.amazonaws.com/fotopredeterminada.png'} />
            </strong>
        ),
    },
    { field: 'name_contact', headerName: 'Contacto', width: 130 },
    { field: 'name_country', headerName: 'País', width: 100 },
    { field: 'name_company', headerName: 'Compañía', width: 120 },
    { field: 'position', headerName: 'Cargo', width: 100 },
    { field: 'name_channel', headerName: 'Canal preferido', width: 120 },
    { field: 'contact_account', headerName: 'Cuenta de usuario', width: 160 },
    { field: 'value_commitment', headerName: 'Interés', width: 100 },
    {
        field: 'Acciones',
        headerName: 'Acciones',
        width: 120,
        renderCell: (params) => (
            <strong>
                {console.log(params)}
                <Tooltip title='Eliminar'>
                    <IconButton onClick={() => deleteContact(params.id)}>
                        <DeleteIcon style={{ color: Red[700] }} />
                    </IconButton>
                </Tooltip>

                <Link style={{ background: 'transparent' }} to={{
                    pathname: '/editar/contact',
                    id: params.row.id,
                    nombreValue: params.row.name_contact,
                    apellidoValue: params.row.lastname_contact,
                    cargoValue: params.row.position,
                    src: params.row.urlPhoto_contact,
                    correoValue: params.row.email_contact,
                    companyValue: params.row.name_company,
                    regionValue: params.row.Region.name_region,
                    countryValue: params.row.name_country,
                    cityValue: params.row.city.name_city,
                    addressValue: params.row.address,
                    channelValue: params.row.name_channel,
                    cuentaValue: params.row.contact_account,
                    preferenceValue: params.row.preference.name_preference,
                    defaultValue: params.row.valueComitId,


                    idRegion: params.row.Region.id_region,
                    idCountry: params.row.idCountry,
                    idChannel: params.row.idChannel,
                    idCommitment: params.row.idCommitment,
                    idCompany: params.row.idCompany,
                    idPreference: params.row.idPreference,
                    idCity: params.row.city.id_city,
                    idPhoto: params.row.id_photo

                }}>
                    <Tooltip title='Editar'>
                        <IconButton >
                            <EditIcon style={{ color: Indigo[700] }} />
                        </IconButton>
                    </Tooltip>
                </Link>
            </strong>
        ),
    },
]

const Tables = ({ contacts }) => {
    const classes = useStyle()
    let rows = []
    console.log(contacts)

    contacts.map(c => {
        rows.push({
            id: c.id,
            urlPhoto_contact: c.Photo.urlPhoto_contact,
            name_contact: c.name_contact,
            lastname_contact: c.lastname_contact,
            email_contact: c.email_contact,
            address: c.address,
            Region: c.Region,
            city: c.City,
            preference: c.Preference,
            name_country: c.Country.name_country,
            name_company: c.Company.name_company,
            position: c.position,
            name_channel: c.Channel.name_channel,
            contact_account: c.contact_account,
            value_commitment: c.Commitment.value_commitment,
            valueComitId: c.id_commitment,
            idCompany: c.Company.id_company,
            idChannel: c.Channel.id_channel_comunication,
            idPreference: c.Preference.id_preference,
            idCountry: c.Country.id_country,
            idPhot: c.id.photo
        })
    })

    console.log(rows)
    return (
        <>
            <h3>Contactos</h3>
            <div>
                <TextField className='busqueda' label="Filtrar" variant="outlined" margin="dense" />
                <Link to='/create/contact'>
                    <Button className={`btn__card__agregar ${classes.color} ${classes.top}`} variant="text">
                        Crear Contacto
                    </Button>
                </Link>
            </div>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid key={rows.id} rows={rows} columns={columns} pageSize={7} checkboxSelection />
            </div>
        </>

    )
}

const mapStateToProps = state => ({
    contacts: state.contactsReducer.contacts
})


export default connect(mapStateToProps, {})(Tables)

