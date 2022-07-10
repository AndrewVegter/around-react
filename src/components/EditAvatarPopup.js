import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
        avatarRef.current.value = "";
        onClose();
    }

    return (
      <PopupWithForm name="edit-avatar" title="Change profile picture" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <label className="popup__field">
          <input
            ref={avatarRef}
            type="url"
            name="avatar"
            className="popup__input"
            placeholder="Avatar URL"
            required
          />
          <span className="popup__error popup__error_type_avatar"></span>
        </label>
      </PopupWithForm>
    )
}