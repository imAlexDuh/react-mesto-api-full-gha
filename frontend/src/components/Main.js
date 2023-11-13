import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-box">
                    <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
                    <button
                        className="profile__avatar-button"
                        onClick={onEditAvatar}>
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__author">
                        <h1 className="profile__author-name">{currentUser.name}</h1>
                        <p className="profile__author-info">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    >
                    </button>
                </div>
                <button
                    className="profile__button"
                    onClick={onAddPlace}
                >
                </button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}



export default Main;