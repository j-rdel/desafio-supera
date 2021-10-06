import Modal from "react-modal";
import closeImg from '../../assets/close.svg';
import { CartItems } from "../../App";

import './style.scss';

interface CartModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    cartItems: CartItems[]
}

export function CartModal({isOpen, onRequestClose, cartItems}: CartModalProps){
    let total = 0;
    let frete = 0;

    function calcTotal(){
        cartItems.forEach(item => {
            total = total + item.price
        });
        total >= 250 ? frete = 0 : frete = cartItems.length*10;
        return (total)
    }

    function calcDeliveryFee(){
        total >= 250 ? frete = 0 : frete = cartItems.length*10;
        return (frete)
    }

    calcDeliveryFee()
    calcTotal()
    return (
        <Modal
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
        <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal" />
        </button>
        <div className="content">
            <h2>Carrinho</h2>
            {cartItems.map(cart => {
                const img = require('../../assets/' + cart.image)
                return(
                    <div key={cart.id}>
                        <div className="cart-product">
                            <div>
                                <img src={img.default} alt="jogo" />
                            </div>
                            <div>
                                <span>{cart.name}</span>
                            </div>
                            <div>
                                <span>R$ {cart.price}</span>
                            </div>
                        </div>
                    </div>
                )}
            )}
            <hr />
            <div className="cart-request">
                <div><h3>Total dos produtos: </h3></div>
                <div><span>R$ {total}</span></div>
            </div>
            <div className="cart-request">
                <div><h3>Frete: </h3></div>
                <div><span>{frete === 0 ? 'Frete gratuito' : ('R$ ' + frete)}</span></div>
            </div>
            <div className="cart-request">
                <div><h3>Total: </h3></div>
                <div><span>R$ {total + frete}</span></div>
            </div>
            <button type="button" onClick={()=> alert("Espero que tenham gostado!")}>Comprar</button>
        </div>
        </Modal>
    )
}