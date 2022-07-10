import React from 'react';
import edit from '../images/edit.svg';
import add from '../images/add.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Avatar" />
                    <button
                    type="button"
                    className="profile__avatar-button"
                    name="edit-avatar"
                    onClick={props.onEditAvatarClick}
                    >
                        <img
                        className="profile__avatar-button-icon"
                        src={edit}
                        alt="edit avatar button"
                        />
                    </button>
                </div>
                <div className="profile__bio">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" name="edit" onClick={props.onEditProfileClick} className="profile__edit-button">
                        <img
                        className="profile__edit-button-icon"
                        src={edit}
                        alt="edit bio button"
                        />
                    </button>
                    <p className="profile__career">{currentUser.about}</p>
                </div>
                <button type="button" name="add" onClick={props.onAddPlaceClick} className="profile__add-button">
                    <img
                    className="profile__add-button-icon"
                    src={add}
                    alt="add button"
                    />
                </button>
            </section>
            <section className="gallery">
                <ul className="gallery__container">
                    {props.cards.map((cardItem) => {
                        return(
                            <Card key={cardItem._id} card={cardItem} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}