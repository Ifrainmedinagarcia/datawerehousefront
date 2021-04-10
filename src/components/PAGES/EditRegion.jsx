import React from 'react'
import axios from 'axios'
import store from '../../REDUX/store'
import FormAddEditRegion from '../ORGANISMS/FormAddEditRegion'
import { getAllRegions } from '../../REDUX/actionsCreators'

const JWT = localStorage.getItem('token')



const EditRegion = (props) => {
    const id = props.location.id
    const value = props.location.value
   
    const [idPut, setIdPut] = React.useState(id);
    const [valuePut, setValuePut] = React.useState(value)

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
            await axios.put(`http://localhost:3001/v1/api/regions/${idPut}`, data, {
                headers: {
                    'Authorization': JWT,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }).then(res => {
                console.log(res)
                setValuePut(form.regionForm.value)

            })

            await store.dispatch(getAllRegions())

        } catch (error) {
            console.log(error)
        }

        form.regionForm.value = ''

    }

    return (
        <FormAddEditRegion
            title='Editar Region'
            nameBtn='Editar'
            submitBtn={editRegionAction.bind()}
            valueInput={valuePut}
        />
    )
}

export default EditRegion
