import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm
            name="add-popup"
            title="Новое место"
            buttonsName="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

            <input onChange={handleChangeName} value={name} name="name" type="text" id="photo-name" placeholder="Название"
                className="popup__text popup__text-name" required minLength="2" maxLength="30" />
            <span className="popup__input-error" id="photo-name-error"></span>
            <input onChange={handleChangeLink} value={link} name="link" type="url" id="photo-link" placeholder="Ссылка на картинку"
                className="popup__text popup__text-img" required />
            <span className="popup__input-error" id="photo-link-error">Введите URL.</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;