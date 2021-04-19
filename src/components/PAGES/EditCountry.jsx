import React, { useEffect } from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import axios from 'axios'
import store from '../../REDUX/store';
import { getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
import FormEditCountryCity from '../ORGANISMS/FormEditCountryCity'

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const EditCountry = (props) => {

    useEffect(() => {
        store.dispatch(getAllRegions())
        store.dispatch(getAllCountries())
    }, [])

    const id = props.location.id
    const labelRegion = props.location.labelRegion
    const labelCountry = props.location.labelCountry
    const idRegion = props.location.idRegion

    const [idPut] = React.useState(id);
    const [valuePut, setValuePut] = React.useState(labelCountry)

    const editCountryAction = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_country": form.countryInput.value,
            "id_region": idRegion,
            "id_user": userId
        }

        if (data.name_region === '') {
            return alert('Input vacío')
        }

        try {
            await axios.put(`http://localhost:3001/v1/api/countries/${idPut}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(res => {
                console.log(res)
                setValuePut(form.countryInput.value)

            })

            await store.dispatch(getAllRegions())

        } catch (error) {
            console.log(error)
        }

        form.countryInput.value = ''

    }

    return (
        <>
            <NavbarUser />
            <Cajon />
            <FormEditCountryCity
                title='Editar País'
                submitBtn={editCountryAction.bind()}
                valueInput={valuePut}
                labelRegion={labelRegion}
            />
        </>
    )
}

export default EditCountry
