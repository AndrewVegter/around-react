export default function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card);
    }
    return (
        <li className="gallery__cell">
            <button
            type="button"
            name="delete"
            className="gallery__delete-button"
            ></button>
            <img className="gallery__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="gallery__plaque">
                <h2 className="gallery__title">{card.name}</h2>
                <div className="gallery__like-container">
                    <button type="button" name="like" className="gallery__button"></button>
                    <p className="gallery__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}