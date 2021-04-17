import axios from 'axios'
import React from 'react'
import { getAllCompanies } from '../../REDUX/actionsCreators'
import store from '../../REDUX/store'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import FormAddEditCompany from '../ORGANISMS/FormAddEditCompany'
store.dispatch(getAllCompanies())
const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const EditCompany = (props) => {

    const id = props.location.id
    const addressValue = props.location.addressValue
    const valueNameCompany = props.location.valueNameCompany
    const valueCountry = props.location.valueCountry

    const updateCompany = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            'name_company': form.nombreCompany.value,
            'id_country': form.valueCountry.value,
            'address': form.addressValue.value
        }
        try {
            axios.put(`http://localhost:3001/v1/api/companies/${id}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
            })
            await store.dispatch(getAllCompanies())
        } catch (error) {
            console.log(error)
        }
        window.location = '/company'
    }

    return (
        <>
            <NavbarUser />
            <Cajon />
            <FormAddEditCompany
                title='Editar Compañía'
                btnName='Actualizar'
                SubmitBtn={updateCompany.bind()}
                addressValue={addressValue}
                valueNameCompany={valueNameCompany}
                valueCountry={valueCountry}
            />
        </>
    )
}

export default EditCompany
