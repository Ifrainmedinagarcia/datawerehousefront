import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import axios from 'axios'
import store from '../../REDUX/store';
import { getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
import FormEditCountryCity from '../ORGANISMS/FormEditCountryCity'
store.dispatch(getAllRegions())
store.dispatch(getAllCountries())

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


const EditCity = (props) => {

    const id = props.location.id
    const labelCountry = props.location.labelCountry
    const valueInputCity = props.location.valueInputCity

    const [idPut, setIdPut] = React.useState(id);
    const [valuePut, setValuePut] = React.useState(valueInputCity)

    const editCityAction = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_city": form.countryInput.value
        }

        if (data.name_city === '') {
            return alert('Input vacío')
        }

        try {
            await axios.put(`http://localhost:3001/v1/api/cities/${idPut}`, data, {
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
                title='Editar Cuidad'
                submitBtn={editCityAction.bind()}
                valueInput={valuePut}
                labelRegion={labelCountry}
            />
        </>
    )
}

export default EditCity
