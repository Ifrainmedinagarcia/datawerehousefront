import axios from 'axios'
import { GET_ALL_COUNTRIES, GET_ALL_REGIONS } from './accions'

const JWT = localStorage.getItem('token')

export const getAllRegions = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/regions', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return dispatch({
                type: GET_ALL_REGIONS,
                regions: res.data.data
            })
        }).catch(e => console.log(e))

}

export const getAllCountries = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/countries', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return dispatch({
                type: GET_ALL_COUNTRIES,
                countries: res.data.data
            })
        }).catch(e => console.log(e))

}
