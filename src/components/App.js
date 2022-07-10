import React from 'react';
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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([projectApi.getUserInfo(), projectApi.getInitialCards()])
        .then(([user, cards]) => {
            setCurrentUser(user);
            setCards(cards);
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
    card.isOpen = true;
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ link: selectedCard.link, name: selectedCard.name, isOpen: false });
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
