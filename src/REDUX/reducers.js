
import { GET_ALL_CHANNELS, GET_ALL_CITIES, GET_ALL_COMMITMENTS, GET_ALL_COMPANIES, GET_ALL_CONTACTS, GET_ALL_COUNTRIES, GET_ALL_PREFERENCE, GET_ALL_REGIONS, GET_USER } from "./accions"

let initialStateRegion = {
    regions: []
}

let initialStateCountry = {
    countries: []
}

let initialStateUsers = {
    users: []
}

let initialStateContacts = {
    contacts: []
}

let initialStateCities = {
    cities: []
}

let initialStateCompanies = {
    companies: []
}

let initialStateChannels = {
    channels: []
}

let initialStateCommitment = {
    commitments: []
}

let initialStatePreference = {
    preferences: []
}

export const usersReducer = (state = initialStateUsers, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

export const contactsReducer = (state = initialStateContacts, action) => {
    switch (action.type) {
        case GET_ALL_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        default:
            return state
    }
}

export const regionReducer = (state = initialStateRegion, action) => {
    switch (action.type) {
        case GET_ALL_REGIONS:
            return {
                ...state,
                regions: action.regions
            }

        default:
            return state
    }
}

export const countryReducer = (state = initialStateCountry, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            }
        default:
            return state
    }
}

export const cityReducer = (state = initialStateCities, action) => {
    switch (action.type) {
        case GET_ALL_CITIES:
            return {
                ...state,
                cities: action.cities
            }
        default:
            return state
    }
}

export const companiesReducer = (state = initialStateCompanies, action) => {
    switch (action.type) {
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: action.companies
            }
        default:
            return state
    }

}

export const channelsReducer = (state = initialStateChannels, action) => {
    switch (action.type) {
        case GET_ALL_CHANNELS:
            return {
                ...state,
                channels: action.channels
            }

        default:
            return state
    }
}

export const commitmentsReducer = (state = initialStateCommitment, action) => {
    switch (action.type) {
        case GET_ALL_COMMITMENTS:
            return {
                ...state,
                commitments: action.commitments
            }
        default:
            return state
    }
}

export const preferencesReducer = (state = initialStatePreference, action) => {
    switch (action.type) {
        case GET_ALL_PREFERENCE:
            return {
                ...state,
                preferences: action.preferences
            }
        default:
            return state
    }
}

