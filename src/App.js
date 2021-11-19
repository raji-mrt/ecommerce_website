import React, {useState, useEffect} from 'react';
import { Products, Navbar, Cart } from './components';
import {commerce} from './lib/commerce' ;
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handlUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart)
    }

    const handleRemoveFromCart = async ( productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    
    console.log( "APP" );
    console.log( cart);


    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Route exact path="/">
                    <Products products = {products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart} 
                    handlUpdateCartQty={handlUpdateCartQty}
                    handleRemoveFromCart = {handleRemoveFromCart}
                    handleEmptyCart = {handleEmptyCart}
                    />
                </Route>
            </div>
        </Router>
    )
}

//https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/index.js

export default App
