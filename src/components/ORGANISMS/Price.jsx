import React from 'react'
import Cardprice from '../MOLECULES/Cardprice'

const Price = () => {
    return (
        <section className="container__price">

            <h5 className="planes">PLANES</h5>
            <p className="promocion">Precios promocionales por lanzamiento</p>

            <div className="container__price__flex">

                <Cardprice
                    plan='BASIC'
                    price='$0/m'
                    benef1='Gestión de contactos'
                    benef2='Clasifica según interés'
                    benef3='10 contactos nuevo por día'
                />
                <Cardprice
                    plan='PREMIUM'
                    price='$100/m'
                    benef1='Incluye ambos planes'
                    benef2='Contactos ilimitados'
                    benef3='Analitycs full'
                    scale='scale'
                />
                <Cardprice
                    plan='MEDIUM'
                    price='$90/m'
                    benef1='Todo del plan BASIC'
                    benef2='100 contactos nuevos por día'
                    benef3='Funciones de analytics básicas'
                />


            </div>
        </section>
    )
}

export default Price
