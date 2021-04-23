import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TitleWelcomeForm from '../MOLECULES/TitleWelcomeForm'
import { makeStyles } from '@material-ui/core/styles'
import store from '../../REDUX/store'
import { getAllRegions } from '../../REDUX/actionsCreators'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'

const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})

const nombre = localStorage.getItem('welcome')

const Welcome = ({ regions }) => {
    const classes = useStyle()
    useEffect(() => {
        store.dispatch(getAllRegions())
    }, [])
    if (regions.length !== 0) {
        return <Redirect to='/contacts' />
    }
    return (
        <main className="main">
            <TitleWelcomeForm
                title={` ${nombre} Antes de empezar debes configurar tu cuenta`}
            />
            <NavLink style={{ background: 'transparent', height: '40px', width: '100%' }} to='/region/config'>

                <Button className={`btn__card form__welcome ${classes.color}`} variant="text" color="default">
                    Configurar
                </Button>

            </NavLink>

            <img className="img__footer__login" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
        </main>
    )
}

const mapStateToProps = state => ({
    regions: state.regionReducer.regions
})
export default connect(mapStateToProps, {})(Welcome)