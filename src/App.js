import { Cart } from '@chec/commerce.js/features/cart';
import React, {useState, useEffect} from 'react'

import { Products, Navbar } from './components'
import {commerce} from './lib/commerce' 

function App() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    useEffect(() => {
        fetchProducts()
    }, []);


    return (
        <div>
            <Navbar />
            <Products products = {products}/>
        </div>
    )
}
create the Cart 

//https://github.com/adrianhajdin/project_e_commerce/blob/main/src/components/index.js

export default App
