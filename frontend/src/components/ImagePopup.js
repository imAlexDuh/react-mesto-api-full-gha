import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="img-popup">
            <div className="popup__img">
                <img alt={card.name} src={card.link} className="popup__image" />
                <p className="popup__image-name">{card.name}</p>
                <button onClick={onClose} type="button" id='img-popup__close-button' className="popup__close-button"></button>
            </div>
        </div>
    )
}



export default ImagePopup;