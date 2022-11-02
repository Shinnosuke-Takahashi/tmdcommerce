import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import headerImage from './Assets/Images/header.jpg';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async(productId, quantity, variant=null) => {    
    setCart(await commerce.cart.add(productId, quantity, variant));
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));
  }

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));
  }

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[])



  return (
    <Router>
      <>
        <Navbar totalItems={cart.total_items}/>
        <img className='headerImg' src={headerImage} alt="header image"/>
        <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} cart={cart}/>}/>
          <Route path="/cart" element={<Cart cart={cart} 
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onEmptyCart={handleEmptyCart}
            products={products}
          />}/>
          <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}/>
        </Routes>
      </>
    </Router>

  )
}

export default App