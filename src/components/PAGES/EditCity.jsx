import React from 'react'
import NavbarUser from '../MOLECULES/NavbarUser'
import Cajon from '../ORGANISMS/Cajon'
import axios from 'axios'
import store from '../../REDUX/store';
import { getAllCountries, getAllRegions } from '../../REDUX/actionsCreators';
import FormEditCountryCity from '../ORGANISMS/FormEditCountryCity'
store.dispatch(getAllRegions())
store.dispatch(getAllCountries())


const EditCity = (props) => {

    const id = props.location.id
    const labelCountry = props.location.labelCountry
    const idRegion = props.location.idRegion


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
