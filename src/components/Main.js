import React from 'react';
import edit from '../images/edit.svg';
import add from '../images/add.svg';
import { projectApi } from '../utils/api.js';
import Card from './Card.js';

export default function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([projectApi.getUserInfo(), projectApi.getInitialCards()])
            .then(([userData, cards]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cards);
            })
            .catch(([userErr, cardsErr]) => {
                console.log(userErr);
                console.log(cardsErr);
            });
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userAvatar} alt="Avatar" />
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
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" name="edit" onClick={props.onEditProfileClick} className="profile__edit-button">
                        <img
                        className="profile__edit-button-icon"
                        src={edit}
                        alt="edit bio button"
                        />
                    </button>
                    <p className="profile__career">{userDescription}</p>
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
                    {cards.map((cardItem, index) => {
                        return(
                            <Card key={index} card={cardItem} onCardClick={props.onCardClick}/>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}