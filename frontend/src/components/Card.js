import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardRemoveButtonClass = `${isOwn ? 'elements__delete-button elements__delete-button_visible' : 'elements__delete-button elements__delete-button_hidden'}`
    const cardLikeButtonClass = `${isLiked ? 'elements__card-button elements__card-button_active' : 'elements__card-button'}`

    function handleCardClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <div className="elements__element">
            <img src={props.card.link} alt={props.card.name} className="elements__pic" onClick={handleCardClick} />
            <button onClick={handleDeleteClick} className={cardRemoveButtonClass}></button>
            <div className="elements__card">
                <h2 className="elements__card-name">{props.card.name}</h2>
                <div className="elements__like">
                    <button onClick={handleLikeClick} className={cardLikeButtonClass}></button>
                    <span className="elements__card-count">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}



export default Card;