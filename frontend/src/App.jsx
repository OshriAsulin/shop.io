import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store.jsx'
import CartScreen from './pages/CartScreen'
import SigninScreen from './pages/SigninScreen'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './pages/ShippingAddressScreen'
import SignupScreen from './pages/SignupScreen'
import PaymentMethodScreen from './pages/PaymentMethodScreen'
import PlaceOrderScreen from './pages/PlaceOrderScreen'
import OrderScreen from './pages/OrderScreen'
import OrderHistoryScreen from './pages/OrderHistoryScreen'
import ProfileScreen from './pages/ProfileScreen'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminDashboardScreen from './pages/AdminDashboardScreen'
import AboutScreen from './pages/AboutScreen'
import ForgetPasswordScreen from './pages/ForgetPasswordScreen'
import ResetPasswordScreen from './pages/ResetPasswordScreen'
import AdminProductsScreen from './pages/AdminProductsScreen'
import AdminOrdersScreen from './pages/AdminOrdersScreen'
import AdminUsersScreen from './pages/AdminUsersScreen'
import axios from 'axios'
import { getError } from './utils'
import SearchBox from './components/SearchBox'
import SearchScreen from './pages/SearchScreen'


function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin';
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fecthCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories')
        setCategories(data)
      } catch (error) {
        toast.error(getError(error));
      }
    }
    fecthCategories()
  }, [])
  return (
    <>
      <div className={sidebarOpen ? 'd-flex flex-column site-container active-container' : 'd-flex flex-column site-container'}>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg="dark" variant='dark' expand="lg">
            {/* {this container set the position of thlinks and the name of the site} */}
            <Container>
              {/* <LinkContainer to='/'> */}
              {/* <Navbar.Brand></Navbar.Brand> */}
              {/* <a>Shop.io</a> */}
              {/* </LinkContainer> */}
              <Button
                variant="dark"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <div>
                <Link className='app-title' to='/'>Shop.io</Link>
              </div>
              <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
              <Navbar.Collapse id='basic-navbar-nav'>
                <div className="search-button">
                  <SearchBox/>
                </div>
                <Nav className='me-auto w-100 justify-content-end'>
                  <Link className='nav-link' to="/about">About</Link>
                  <Link to='/cart' className='nav-link'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >Sign Out</Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        {/*  */}
        <div className={
          sidebarOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }>
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer style={{color: '#fff'}}
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        {/*  */}
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/search' element={<SearchScreen />} />
              <Route path='/about' element={<AboutScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/profile' element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/forget-password' element={<ForgetPasswordScreen />} />
              <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
              <Route path='/order/:id' element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
              <Route path='/orderhistory' element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
              {/**admin routes */}
              <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardScreen /></AdminRoute>} />
              <Route path='/admin/products' element={<AdminRoute><AdminProductsScreen /></AdminRoute>} />
              <Route path='/admin/orders' element={<AdminRoute><AdminOrdersScreen /></AdminRoute>} />
              <Route path='/admin/users' element={<AdminRoute><AdminUsersScreen /></AdminRoute>} />

              <Route path='/' element={<HomeScreen />} />
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
