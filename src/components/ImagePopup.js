export default function ImagePopup(props) {
    return (
        <div id="image-container" className={`popup ${props.card.isOpen ? "" : "invisible"}`}>
            <div className="popup__image-container">
                <button
                onClick={props.onClose}
                type="button"
                name="exit"
                className="popup__exit-button"
                ></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <h2 className="popup__image-title">{props.card.name}</h2>
            </div>
    </div>
    )
}