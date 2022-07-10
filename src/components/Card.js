import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwned = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const deleteButtonClassName = `gallery__delete-button ${isOwned ? `` : `gallery__delete-button_invisible`}`;
    const likeButtonClassName = `gallery__button ${isLiked ? `gallery__button_active` : ``}`;
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }
    return (
        <li className="gallery__cell">
            <button
            type="button"
            name="delete"
            className={deleteButtonClassName}
            onClick={handleDeleteClick}
            ></button>
            <img className="gallery__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="gallery__plaque">
                <h2 className="gallery__title">{card.name}</h2>
                <div className="gallery__like-container">
                    <button type="button" name="like" className={likeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="gallery__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}