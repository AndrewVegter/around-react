import React from "react"

export default function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "" : "invisible"}`}> 
            <div className="popup__container">
                <button
                onClick={props.onClose}
                type="button"
                name="exit"
                className="popup__exit-button"
                ></button>
                <form name={props.name} className="popup__form" onSubmit={props.handleSubmit} noValidate>
                    <h2 className={`popup__title ${props.isFailsafe ? "popup__title_margin_low" : ""}`}>{props.title}</h2>
                    {props.children}
                    <button type="submit" name="Save" className="popup__button">{`${props.isFailsafe ? "Yes" : "Save"}`}</button>
                </form>
            </div>
        </div>
    )
}