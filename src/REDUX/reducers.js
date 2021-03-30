import { DELETE_REGIONS, GET_ALL_REGIONS } from "./accions"

export const usersReducer = (state = {}, action) => {
    return state
}

export const contactsReducer = (state = {}, action) => {
    return state
}

export const regionReducer = (state = {}, action) => {
    if (action.type === GET_ALL_REGIONS) {
        return action.regions
    }

    if (action.type === DELETE_REGIONS) {
        return action.regions
    }
    return state
}

export const countryReducer = (state = {}, action) => {
    return state
}

export const cityReducer = (state = {}, action) => {
    return state
}

export const companyReducer = (state = {}, action) => {
    return state
}