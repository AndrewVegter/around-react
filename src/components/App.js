import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import projectApi from '../utils/api.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /*Sorry, I originally had a catch block, but thought that since I have a function in api.js that checks every response that a catch block 
  here might be redundant -- it's been a few months since I learned about promises, bit rusty :D*/
  useEffect(() => {
    Promise.all([projectApi.getUserInfo(), projectApi.getInitialCards()])
        .then(([user, cards]) => {
            setCurrentUser(user);
            setCards(cards);
        })
        .catch(([userErr, cardsErr]) => {
          console.log(userErr);
          console.log(cardsErr);
        })
  }, [])

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
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(data) {
    projectApi.updateUserData(data).then((user) => setCurrentUser(user));
  }

  function handleUpdateAvatar(data) {
    projectApi.updateUserAvatar(data).then((user) => setCurrentUser(user));
  }

  function handleAddPlace(data) {
    projectApi.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    projectApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    });
  }

  function handleCardDelete(card) {
    projectApi.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
    })
  }

  return (
    <div className="page">
      <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
        onCardClick={handleCardClick} 
        onEditProfileClick={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        onEditAvatarClick={handleEditAvatarClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
