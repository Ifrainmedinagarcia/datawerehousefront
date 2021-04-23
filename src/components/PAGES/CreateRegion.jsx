import React from 'react'
import axios from 'axios'
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'
import FormAddEditRegion from '../ORGANISMS/FormAddEditRegion'
import CustomizedSnackbars from '../ATOMS/CustomizedSnackbars'

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')

const CreateRegion = () => {

    const [message, setMessage] = React.useState(false)

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
            setMessage(false)
            await axios.post('https://datawerehouse.herokuapp.com/v1/api/regions', data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    setMessage(true)
                })

            await store.dispatch(getAllRegions())

        } catch (error) {
            alert(`ocurrió un error, recargue la página ${error}`)
        }

        form.regionForm.value = ''
    }

    return (
        <>
            {
                message ?
                    <CustomizedSnackbars
                        message='Región agregada con éxito'
                    />
                    : ''
            }
            <FormAddEditRegion
                title='Agregar Región'
                nameBtn='Agregar'
                submitBtn={createRegion.bind()}
                valueInput='Región'

            />

        </>
    )
}

export default CreateRegion
