import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    card.isOpen = true;
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: selectedCard.link, name: selectedCard.name, isOpen: false });
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main 
        onCardClick={handleCardClick} 
        onEditProfileClick={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        onEditAvatarClick={handleEditAvatarClick}
        />
        <Footer />
        <PopupWithForm isFailsafe={false} name="edit-profile" title="Edit profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input
              type="text"
              id="name"
              name="name"
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
              id="job"
              className="popup__input"
              placeholder="About me"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_type_job"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm isFailsafe={false} name="add-place" title="New place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input
              type="text"
              id="title"
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
              id="link"
              name="link"
              className="popup__input"
              placeholder="Image URL"
              required
            />
            <span className="popup__error popup__error_type_link"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm isFailsafe={false} name="edit-avatar" title="Change profile picture" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__field">
            <input
              type="url"
              id="avatar"
              name="avatar"
              className="popup__input"
              placeholder="Avatar URL"
              required
            />
            <span className="popup__error popup__error_type_avatar"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm isFailsafe={true} name="delete-image" title="Are you sure?" isOpen={false} onClose={closeAllPopups}></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
