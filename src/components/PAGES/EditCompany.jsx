import axios from 'axios'
import React, { useEffect } from 'react'
import { getAllCompanies, getAllCountries } from '../../REDUX/actionsCreators'
import store from '../../REDUX/store'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import FormAddEditCompany from '../ORGANISMS/FormAddEditCompany'
import { useHistory } from "react-router-dom"


const JWT = localStorage.getItem('token')


const EditCompany = (props) => {
    let history = useHistory()

    useEffect(() => {
        store.dispatch(getAllCompanies())
        store.dispatch(getAllCountries())
    }, [])

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
            axios.put(`https://datawerehouse.herokuapp.com/v1/api/companies/${id}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                store.dispatch(getAllCompanies())
                store.dispatch(getAllCountries())
            })
            await store.dispatch(getAllCompanies())
        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
        }
        finally {
            return history.push('/company')
        }
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
