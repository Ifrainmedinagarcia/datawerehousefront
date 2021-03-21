import React from 'react'
import Navbar from '../MOLECULES/Navbar'
import Button from '@material-ui/core/Button'

const Header = () => {
    return (
        <>
            <header className="header__flex">
                <Navbar />
            </header>
            <section className="container__banner__flex">


                <div className="container__banner__title">
                    <h1>EN TIDY UP</h1>
                    <h2 className="carga">Carga, organiza y gestiona a tus actuales y futuros clientes</h2>
                    <br />
                    <Button href='/register' className="btn__banner" >
                        Empieza ya
                    </Button>

                </div>

                <div className="container__banner__igm">
                    <img className="img__banner" src="https://imgeneral.s3-sa-east-1.amazonaws.com/2448+%5BConvertido%5D.png"
                        alt="" />
                </div>

            </section>
        </>
    )
}

export default Header
