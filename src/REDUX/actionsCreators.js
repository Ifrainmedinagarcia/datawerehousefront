import axios from 'axios'
import { GET_ALL_CHANNELS, GET_ALL_CITIES, GET_ALL_COMMITMENTS, GET_ALL_COMPANIES, GET_ALL_CONTACTS, GET_ALL_COUNTRIES, GET_ALL_PREFERENCE, GET_ALL_REGIONS, POST_REGIONS } from './accions'

const JWT = localStorage.getItem('token')

//REGIONS
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

//COUNTRIES
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

//COMPANIES
export const getAllCompanies = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/companies', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return dispatch({
                type: GET_ALL_COMPANIES,
                companies: res.data.data
            })
        }).catch(e => console.log(e))

}

//CONTACTS
export const getAllContacts = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/contacts', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return dispatch({
                type: GET_ALL_CONTACTS,
                contacts: res.data.data
            })
        }).catch(e => console.log(e))
}

//CHANNELS
export const getAllChannels = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/channels', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return dispatch({
                type: GET_ALL_CHANNELS,
                channels: res.data.data
            })
        }).catch(e => console.log(e))
}

//COMMITMENTS
export const getAllCommitments = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/commiment', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return dispatch({
            type: GET_ALL_COMMITMENTS,
            commitments: res.data.data
        })
    })
}

//PREFERENCES
export const getAllPreferences = () => dispatch => {
    axios.get('http://localhost:3001/v1/api/preferences', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return dispatch({
            type: GET_ALL_PREFERENCE,
            preferences: res.data.data
        })
    })
}

export const getAllcities = () => dispatch => {
    axios.get('http://localhost:3000/v1/api/cities', {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return dispatch({
            type: GET_ALL_CITIES,
            cities: res.data.data
        })
    })
}