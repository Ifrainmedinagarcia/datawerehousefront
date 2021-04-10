import React from 'react'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'
import FormAddEditRegion from '../ORGANISMS/FormAddEditRegion'

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')

const createRegion = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
        "name_region": form.regionForm.value,
        "id_user": userId
    }

    if (data.name_region === '') {
        return alert('Input vacío')
    }

    try {
        await axios.post('http://localhost:3001/v1/api/regions', data, {
            headers: {
                'Authorization': JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
            })

        await store.dispatch(getAllRegions())

    } catch (error) {
        console.log(error);
    }

    form.regionForm.value = ''
}

const CreateRegion = () => {

    return (
        <FormAddEditRegion
            title='Agregar Región'
            nameBtn='Agregar'
            submitBtn={createRegion.bind()}
            valueInput='Región'

        />
    )
}

export default CreateRegion
