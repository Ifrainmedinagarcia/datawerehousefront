import axios from 'axios'
import { DELETE_REGIONS, GET_ALL_REGIONS } from './accions'

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
                regions: res.data
            })
        }).catch(e => console.log(e))

}

export const deleteFromRegion = (id) => dispatch => {
    axios.delete(`http://localhost:3000/v1/api/regions/${id}`, {
        'Authorization': JWT,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
        .then(res => {
            return dispatch({
                type: DELETE_REGIONS,
                regions: res.data
            })
        }).catch(e => console.log(e))
}
