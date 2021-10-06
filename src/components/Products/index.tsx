import { useContext, useState } from "react";
import { CartItems } from "../../App";
import { ProductsContext } from "../../ProductsContext";

import './style.scss';

interface ProductsProps {
    setCart: (product: CartItems) => void
}

export function Products (props: ProductsProps){
    const { products } = useContext(ProductsContext)
    const [orderBy, setOrderBy] = useState(0);
    
    function orderProducts(){
        if (orderBy === 0) {
            orderByPrice()
        } else if (orderBy === 1){
            orderByScore()
        } else {
            orderByAlphabet()
        }
    }
    
    function orderByPrice(){
        products.sort((a,b)=> {
            let comparison = 0;
            if (a.price > b.price) {
              comparison = 1;
            } else if (a.price < b.price) {
              comparison = -1;
            }
            return comparison;
        });
    }

    function orderByScore(){
        products.sort((a,b)=> {
            let comparison = 0;
            if (a.score > b.score) {
              comparison = 1;
            } else if (a.score < b.score) {
              comparison = -1;
            }
            return comparison;
        });
    }

    function orderByAlphabet(){
        products.sort((a,b)=> {
            let comparison = 0;
            if (a.name > b.name) {
              comparison = 1;
            } else if (a.name < b.name) {
              comparison = -1;
            }
            return comparison;
        });
    }

    
    orderProducts()
    return (
        <section>
            <h1>Produtos</h1>
            <div className="order-buttons">
                <span>Ordenar por </span>
                <button onClick={() => setOrderBy(0)}>R$</button>
                <button onClick={() => setOrderBy(1)}>Popularidade</button>
                <button onClick={() => setOrderBy(2)}>Ordem alfabetica</button>
            </div>
            <div className="products-row">
                {products.map(product => {
                    const img = require('../../assets/' + product.image)
                    return (
                        <div className="product-item" key={product.id}>
                            <img src={img.default} alt="jogo" />
                            <h2>{product.name}</h2>
                            <p>{product.score}</p>
                            <h1>R$ {product.price}</h1>
                            <button type="button" onClick={() => props.setCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                score: product.score,
                                image: product.image
                            })}>Adicionar ao carrinho</button>
                        </div>
                    )}
                )}
            </div>
        </section>
    )

}