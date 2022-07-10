import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

//Thank you!//

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser])

    function handleNameChange(evt) {
      setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
      setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
        onClose();
    }

    return (
        <PopupWithForm name="edit" title="Edit profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="popup__input"
              placeholder="Name"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error popup__error_type_name" />
          </label>
          <label className="popup__field">
            <input
              type="text"
              name="about"
              value={description}
              onChange={handleDescriptionChange}
              className="popup__input"
              placeholder="About me"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_type_job" />
          </label>
        </PopupWithForm>
    )
}
