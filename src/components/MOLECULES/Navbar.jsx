import React from 'react'
import Button from '@material-ui/core/Button'

const Navbar = () => {
    return (
        <>

            <figure>
                <img className="img__navbar" src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png" alt="" />
            </figure>


            <nav className="nav__container">
                <ul className="nav__container__lists__flex">
                    <Button href='/' exact className="nav__list__item" variant="text" color="default">
                        Home
                    </Button>
                    <Button href='/register' className="nav__list__item" variant="text" color="default">
                        Registro
                    </Button>
                    <Button href='/login' className="nav__list__item" variant="text" color="default">
                        Login
                    </Button>

                </ul>
            </nav>
        </>

    )
}

export default Navbar
