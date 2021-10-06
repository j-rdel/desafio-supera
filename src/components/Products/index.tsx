import { useContext, useState } from "react";
import { CartItems } from "../../App";
import { ProductsContext } from "../../ProductsContext";

import './style.scss';

interface ProductsProps {
    setCart: (product: CartItems) => void
}

type Type =  {
    type: string
}

export function Products (props: ProductsProps){
    const { products } = useContext(ProductsContext)
    const [orderBy, setOrderBy] = useState('name');

    function orderProducts(){
        orderItems(orderBy)
    }

    function orderItems(value: String) {
        products.sort((a,b)=> {
           
            let comparison = 0;
            if (a[value as keyof typeof Products] > b[value as keyof typeof Products]) {
              comparison = 1;
            } else if (a[value as keyof typeof Products] < b[value as keyof typeof Products]) {
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
                <button onClick={() => setOrderBy('price')}>R$</button>
                <button onClick={() => setOrderBy('score')}>Popularidade</button>
                <button onClick={() => setOrderBy('name')}>Ordem alfabetica</button>
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