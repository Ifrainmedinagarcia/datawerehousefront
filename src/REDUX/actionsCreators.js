import axios from 'axios'
import { GET_ALL_CHANNELS, GET_ALL_CITIES, GET_ALL_COMMITMENTS, GET_ALL_COMPANIES, GET_ALL_CONTACTS, GET_ALL_COUNTRIES, GET_ALL_PREFERENCE, GET_ALL_REGIONS, GET_USER } from './accions'

const userLocalId = localStorage.getItem('user')
const userId = JSON.parse(userLocalId)
const JWT = localStorage.getItem('token')


//REGIONS
export const getAllRegions = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/regions', {
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
        }).catch(e => {
            if (e.response) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('welcome')
                localStorage.removeItem('apellido')
                localStorage.removeItem('name')
            }
        })
}

//COUNTRIES
export const getAllCountries = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/countries', {
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
        }).catch(e => {
            if (e.response) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('welcome')
                localStorage.removeItem('apellido')
                localStorage.removeItem('name')
            }
        })

}

//COMPANIES
export const getAllCompanies = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/companies', {
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
        }).catch(e => {
            if (e.response.error === "token no válido") {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('welcome')
                localStorage.removeItem('apellido')
                localStorage.removeItem('name')
            }
        })

}

//CONTACTS
export const getAllContacts = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/contacts', {
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
        }).catch(e => {
            if (e.response) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('welcome')
                localStorage.removeItem('apellido')
                localStorage.removeItem('name')
            }
        })
}

//CHANNELS
export const getAllChannels = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/channels', {
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
        }).catch(e => {
            if (e.response) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('welcome')
                localStorage.removeItem('apellido')
                localStorage.removeItem('name')
            }
        })
}

//COMMITMENTS
export const getAllCommitments = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/commiment', {
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
    }).catch(e => {
        if (e.response) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('welcome')
            localStorage.removeItem('apellido')
            localStorage.removeItem('name')
        }
    })
}

//PREFERENCES
export const getAllPreferences = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/preferences', {
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
    }).catch(e => {
        if (e.response) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('welcome')
            localStorage.removeItem('apellido')
            localStorage.removeItem('name')
        }
    })
}

//CITIES
export const getAllcities = () => dispatch => {
    axios.get('https://datawerehouse.herokuapp.com/v1/api/cities', {
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
    }).catch(e => {
        if (e.response) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('welcome')
            localStorage.removeItem('apellido')
            localStorage.removeItem('name')
        }
    })
}

//USERS
export const getUserByid = () => dispatch => {
    axios.get(`https://datawerehouse.herokuapp.com/v1/api/users/${userId}`, {
        headers: {
            'Authorization': JWT,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return dispatch({
            type: GET_USER,
            users: res.data.data
        })
    }).catch(e => {
        if (e.response) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('welcome')
            localStorage.removeItem('apellido')
            localStorage.removeItem('name')
        }
    })
}
