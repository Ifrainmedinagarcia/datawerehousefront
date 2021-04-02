import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
    usersReducer,
    contactsReducer,
    regionReducer,
    countryReducer,
    cityReducer,
    companiesReducer
} from './reducers'



export default createStore(
    combineReducers({
        usersReducer,
        contactsReducer,
        regionReducer,
        countryReducer,
        cityReducer,
        companiesReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)