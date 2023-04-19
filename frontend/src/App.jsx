import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store.jsx'
import CartScreen from './pages/CartScreen'

function App() {
  const { state } = useContext(Store);
  const { cart } = state



  return (
    <>
      <div className='d-flex flex-column site-container'>

        <header>
          <Navbar bg="dark" variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Shop.io</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen/>} />
              <Route path='/cart' element={<CartScreen/>} />
            </Routes>
          </Container>
        </main>
        <footer style={{ background: "#404040" }}>
          <div className='text-center' style={{ color: '#fff' }}>All rights reserved</div>
        </footer>
      </div>
    </>
  )
}

export default App
