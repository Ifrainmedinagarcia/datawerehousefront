
import { GET_ALL_COUNTRIES, GET_ALL_REGIONS } from "./accions"

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
    citie: []
}

let initialStateCompanies = {
    companies: []
}

export const usersReducer = (state = initialStateUsers, action) => {
    return state
}

export const contactsReducer = (state = initialStateContacts, action) => {
    return state
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
    return state
}

export const companyReducer = (state = initialStateCompanies, action) => {
    return state
}