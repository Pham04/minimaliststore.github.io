import React from "react";
import { useState, useEffect } from "react";
import { Products, NavBar, Cart} from './components';
import { commerce } from './lib/commerce';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const theme = createTheme();

const App = () => {

    //setProduct from commerce.com
    const [products, setProducts] = useState([]);
    //setCart

    const [cart, setCart] = useState({});

    
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart)
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const item = await commerce.cart.update(productId, { quantity })

        setCart(item.cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId)

        setCart(item.cart)
    }

    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty()

        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart()
    }, []);

    // console.log(cart.line_items)

    return (
        <Router> 
            <div>
                <ThemeProvider theme={theme}>
                    <NavBar totalItems={cart.total_items} />
                    <Routes>
                        <Route exact path="/" 
                        element={ <Products products={products} onAddToCart={handleAddToCart} /> }>
                        </Route>
                        <Route exact path="/cart"
                        element={ 
                        <Cart cart={cart}
                        onUpdateCartQty={handleUpdateCartQty}
                        onRemoveFromCart={handleRemoveFromCart}
                        onEmptyCart={handleEmptyCart}
                         /> 
                         } >
                        </Route>
                    </Routes>
                </ThemeProvider>
            </div>
        </Router>
    )
}

export default App;