import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChange(evt) {
        if (evt.target.name === "name") {
            setName(evt.target.value);
        } else {
            setLink(evt.target.value);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link,
        });
        evt.target.reset();
        onClose();
    }

    return (
      <PopupWithForm name="add-place" title="New place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <label className="popup__field">
          <input
            type="text"
            onChange={handleChange}
            className="popup__input"
            placeholder="Title"
            name="name"
            required
            minLength="1"
            maxLength="30"
          />
          <span className="popup__error popup__error_type_title"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            onChange={handleChange}
            name="link"
            className="popup__input"
            placeholder="Image URL"
            required
          />
          <span className="popup__error popup__error_type_link"></span>
        </label>
      </PopupWithForm>
    )
}