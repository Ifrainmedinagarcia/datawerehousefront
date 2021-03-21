import React from 'react'
import Button from '@material-ui/core/Button'


const Cardprice = ({ plan, price, benef1, benef2, benef3, scale }) => {
    return (
        <div className={`container__card_flex ${scale}`}>

            <div className="bg__price__gradient">
                <p className="plan_desc">{plan}</p>
                <p className="precio">{price}</p>
            </div>

            <div className="card__body">

                <ul className="container__lists__card">
                    <li className="item__card">{benef1}</li>

                    <li className="item__card">{benef2}</li>

                    <li className="item__card">{benef3}</li>
                </ul>

            </div>

            <Button href='/register' className="btn__card" variant="text" color="default">
                Empieza ya
            </Button>

        </div>
    )
}

export default Cardprice
