import { useState } from 'react';
import Modal from 'react-modal';
import { CartModal } from './components/CartModal';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { ProductsProvider } from './ProductsContext';
import './styles/global.scss';

Modal.setAppElement("#root");

export interface CartItems{
  id: number,
  name: string,
  price: number,
  score: number,
  image: string
}

export function App() {

  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  function handleSetCartItems(product: CartItems){
    let itemExists = false
    if(cartItems.length !== 0){
      cartItems.forEach(item => {
        if (item.id === product.id){
          itemExists = true
        }
      });
    }
    itemExists === false ? setCartItems(oldState => [...oldState, product]) : alert("Você não pode adicionar o mesmo produto ao carrinho!")
  }

  function handleOpenCartModal (){
    setIsCartModalOpen(true)
  }

  function handleCloseCartModal (){
    setIsCartModalOpen(false)
  }
  
  console.log(cartItems)
  return (
    <ProductsProvider>
      <Header cart={cartItems.length} onOpenCartModal={handleOpenCartModal}/>
      <Products setCart={handleSetCartItems}/>
      <CartModal 
        isOpen={isCartModalOpen} 
        onRequestClose={handleCloseCartModal}
        cartItems={cartItems}
      />
    </ProductsProvider>
  );
}
