import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('product api called');
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log('products received');
            });
    }, []);
    useEffect(() => {
        console.log('Local Storage Called');
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                // console.log(key);
                const addedProduct = products.find(product => product.key === key);
                storedCart.push(addedProduct);
            }
            setCart(storedCart);
        }
    }, [products]);
    const handleAddToCart = product => {
        const newCart = [...cart, product];
        setCart(newCart);

        addToDb([product.key]);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product =>
                        <Product
                            product={product}
                            key={product.key}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;