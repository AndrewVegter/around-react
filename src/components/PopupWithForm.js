export default function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "" : "invisible"}`}> 
            <div className="popup__container">
                <button
                onClick={props.onClose}
                type="button"
                name="exit"
                className="popup__exit-button"
                />
                <form name={props.name} onSubmit={props.onSubmit} className="popup__form" noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" name="Save" className="popup__button">Save</button>
                </form>
            </div>
        </div>
    )
}