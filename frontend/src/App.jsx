import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import { Container, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function App() {
  return (
    <>
      <div className='d-flex flex-column site-container'>

        <header>
          <Navbar bg="dark" variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Shop.io</Navbar.Brand>
              </LinkContainer>
              {/* <Link to='/'>Shop.io</Link> */}
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-5'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer style={{background: "#404040"}}>
          <div className='text-center' style={{color: '#fff'}}>All rights reserved</div>
        </footer>
      </div>
    </>
  )
}

export default App
