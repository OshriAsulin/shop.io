import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import '../styles/CategoriesStyles.css'
import { NavLink } from 'react-router-dom'
const Categories = () => {
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
    <div className='categories-container'>
      {/* {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))} */}
      {categories.map((category) => (
        <ul className='list'>
          <li className='li-container'>
            <NavLink >
              <span className='categoriy-div'>
                {category}
              </span>
            </NavLink>
          </li>
        </ul>
      ))}
      {categories.map((category) => (
        <ul className='list'>
          <li className='li-container'>
            <NavLink >
              <span className='categoriy-div'>
                {category}
              </span>
            </NavLink>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Categories