import around from '../images/around.svg';

function Header() {
    return (
        <header className="header">
            <img
             className="header__logo"
             src={around}
             alt="Title: Around the U.S."
            />
        </header>
    )
}

export default Header;