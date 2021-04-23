import React from 'react'
import { Redirect, Route } from 'react-router'

const Public = ({ component: Component, ...rest }) => {

    const userLogged = localStorage.getItem('token')

    if (userLogged) {
        return <Redirect to='/contacts' />
    }
    return (
        <Route {...rest} component={Component} />
    )
}

export default Public
