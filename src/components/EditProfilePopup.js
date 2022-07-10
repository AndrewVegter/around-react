import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleChange(evt) {
        if (evt.target.name === "name") {
            setName(evt.target.value);
        } else {
            setDescription(evt.target.value);
        }
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
              onChange={handleChange}
              className="popup__input"
              placeholder="Name"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error popup__error_type_name"></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              name="about"
              value={description}
              onChange={handleChange}
              className="popup__input"
              placeholder="About me"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_type_job"></span>
          </label>
        </PopupWithForm>
    )
}
