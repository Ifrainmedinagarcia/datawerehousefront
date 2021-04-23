import React from 'react'
import axios from 'axios'
import store from '../../REDUX/store'
import FormAddEditRegion from '../ORGANISMS/FormAddEditRegion'
import { getAllRegions } from '../../REDUX/actionsCreators'
import CustomizedSnackbars from '../ATOMS/CustomizedSnackbars'

const JWT = localStorage.getItem('token')

const EditRegion = (props) => {
    const id = props.location.id
    const value = props.location.value

    const [idPut] = React.useState(id);
    const [valuePut, setValuePut] = React.useState(value)
    const [message, setMessage] = React.useState(false)

    const editRegionAction = async e => {
        e.preventDefault()
        const form = e.target
        const data = {
            "name_region": form.regionForm.value
        }

        if (data.name_region === '') {
            return alert('Input vacío')
        }

        try {
            setMessage(false)
            await axios.put(`https://datawerehouse.herokuapp.com/v1/api/regions/${idPut}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(res => {
                setValuePut(form.regionForm.value)
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
                        message='Región actualizada con éxito'
                    />
                    : ''
            }
            <FormAddEditRegion
                title='Editar Region'
                nameBtn='Editar'
                submitBtn={editRegionAction.bind()}
                valueInput={valuePut}
            />
        </>
    )
}

export default EditRegion
