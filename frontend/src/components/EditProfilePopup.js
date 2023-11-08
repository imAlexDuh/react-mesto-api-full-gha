import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function changeName(e) {
        setName(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });

    }

    return (
        <PopupWithForm
            name="edit-popup"
            title="Редактировать профиль"
            buttonsName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input name="name" type="text" placeholder="Имя" id="profile-name"
                className="popup__text popup__text-name" required minLength="2" maxLength="40" onChange={changeName} value={name || ''}  />
            <span className="popup__input-error" id="profile-name-error"></span>
            <input name="about" type="text" placeholder="Вид деятельности" id="profile-info"
                className="popup__text popup__text-info" required minLength="2" maxLength="200" onChange={changeDescription} value={description || ''} />
            <span className="popup__input-error" id="profile-info-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;