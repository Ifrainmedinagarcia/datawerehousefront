import React from 'react'

const Cardpossibilities = ({ title, image, desc, imgsize }) => {
    return (
        <article className="container__possibilities__article">
            <figure className="container__img__card__possibilities">
                <img className={`igm_card_possibilities ${imgsize}`} src={image} alt="" />
            </figure>
            <div class="container__title__cardp">
                <h3 className='title__card__posibilidad'>{title}</h3>
                <p className="p__possibilities">{desc}</p>

            </div>
        </article>
    )
}

export default Cardpossibilities
