import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
      setName(evt.target.value);
    }

    function handleLinkChange(evt) {
      setLink(evt.target.value);
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
            onChange={handleNameChange}
            className="popup__input"
            placeholder="Title"
            name="name"
            required
            minLength="1"
            maxLength="30"
          />
          <span className="popup__error popup__error_type_title" />
        </label>
        <label className="popup__field">
          <input
            type="url"
            onChange={handleLinkChange}
            name="link"
            className="popup__input"
            placeholder="Image URL"
            required
          />
          <span className="popup__error popup__error_type_link" />
        </label>
      </PopupWithForm>
    )
}