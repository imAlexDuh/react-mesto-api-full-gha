import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isLiked = card.likes.some((i)=> i === currentUser._id);
    const isOwn = card.owner === currentUser._id;
    const cardRemoveButtonClass = `${isOwn ? 'elements__delete-button elements__delete-button_visible' : 'elements__delete-button elements__delete-button_hidden'}`
    const cardLikeButtonClass = `${isLiked ? 'elements__card-button elements__card-button_active' : 'elements__card-button'}`

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <div className="elements__element">
            <img src={card.link} alt={card.name} className="elements__pic" onClick={handleCardClick} />
            <button onClick={handleDeleteClick} className={cardRemoveButtonClass}></button>
            <div className="elements__card">
                <h2 className="elements__card-name">{card.name}</h2>
                <div className="elements__like">
                    <button onClick={handleLikeClick} className={cardLikeButtonClass}></button>
                    <span className="elements__card-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}



export default Card;