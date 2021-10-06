import carticonImg from '../../assets/cart-icon.svg';
import logoImg from '../../assets/logo-epic.png';

import "./style.scss"

interface HeaderProps {
    cart: number,
    onOpenCartModal: () => void
}

export function Header({cart, onOpenCartModal}: HeaderProps){

    return (
        <header>
            <div className="container">
                <div className="header-left">
                    <a href="/">
                        <img src={logoImg} alt="logo" />
                    </a>
                    <a href="#home" className="nav-item">Home</a>
                    <a href="/" className="nav-item">Products</a>
                </div>
                <div className="header-cart">
                    <button type="button" onClick={onOpenCartModal}>
                        <div>{cart}</div>
                        <img src={carticonImg} alt="user" />
                    </button>
                </div>
            </div>
        </header>
    )
}