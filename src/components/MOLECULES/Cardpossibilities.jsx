import React from 'react'

const Cardpossibilities = ({ title, image, desc }) => {
    return (
        <article className="container__possibilities__article">
            <figure className="container__img__card__possibilities">
                <img className="igm_card_possibilities" src={image} alt="" />
            </figure>
            <h3>{title}</h3>
            <p className="p__possibilities">{desc}</p>
        </article>
    )
}

export default Cardpossibilities
