import React from 'react'
import Cardpossibilities from '../MOLECULES/Cardpossibilities'


const Possibilities = () => {

    return (
        <section className="section__posibilidades">

            <h2 className="title__mundo">Un mundo de posibilidades</h2>

            <div className="container__possibilities__flex">

                <Cardpossibilities
                    title='Organización'
                    image='https://imgeneral.s3-sa-east-1.amazonaws.com/laptop.png'
                    desc='Clasifica según el interés de tu contacto y serás más efectivo'
                />
                <Cardpossibilities
                    title='Productividad'
                    image='https://imgeneral.s3-sa-east-1.amazonaws.com/contstruyendo.png'
                    desc='Tidy Up te ayuda ahorrar tiempo en la gestión de contactos'
                />
                <Cardpossibilities
                    title='Nuevos clientes'
                    image='https://imgeneral.s3-sa-east-1.amazonaws.com/laptop.png'
                    desc='Crear contactos en tidy up es muy sencillo'
                    imgsize='imgsize'
                />
            </div>



        </section>
    )
}

export default Possibilities
