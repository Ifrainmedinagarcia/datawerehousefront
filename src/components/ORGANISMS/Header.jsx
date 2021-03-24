import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'


const useStyle = makeStyles({
    color: {
        color: '#F7F9FC'
    }
})


const Header = () => {
    const classes = useStyle()
    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>
            <section className="container__banner__flex">

                <div class="blue"></div>

                <div className="container__banner__title">
                    <h1>EN TIDY UP</h1>
                    <h2 className="carga">Carga, organiza y gestiona a tus actuales y futuros clientes</h2>
                    <br />
                    <Button href='/register' className={`btn__banner ${classes.color}`} >
                        Empieza ya
                    </Button>

                </div>

                <div className="container__banner__igm">
                    <img className="img__banner" src="https://imgeneral.s3-sa-east-1.amazonaws.com/mainimage-min.png"
                        alt="" />
                </div>

            </section>
        </>
    )
}

export default Header
