import React from 'react'
import Building from '../ORGANISMS/Building'
import Footer from '../ORGANISMS/Footer'
import Header from '../ORGANISMS/Header'
import Possibilities from '../ORGANISMS/Possibilities'
import Price from '../ORGANISMS/Price'
import Statistics from '../ORGANISMS/Statistics'
import { Redirect } from 'react-router'




const Home = () => {

    return (
        <>
            <Header />
            <Possibilities />
            <Building />
            <Statistics />
            <Price />
            <Footer />
        </>
    )
}

export default Home
