import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface Product {
    id: number,
    name: string,
    price: number,
    score: number,
    image: string
};

interface ProductProviderProps {
    children: ReactNode
};

interface ProductContextData {
    products: Product[],
}

export const ProductsContext = createContext<ProductContextData>(
    {} as ProductContextData
);

export function ProductsProvider({children}: ProductProviderProps){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('products')
        .then(response => setProducts(response.data))
    }, []);

    return (
       <ProductsContext.Provider value={ {products} }>
           {children}
        </ProductsContext.Provider>
    )
}

