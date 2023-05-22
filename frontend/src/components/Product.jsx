import React, { useContext } from 'react'
import {  Card } from 'react-bootstrap'
import Rating from './Rating'
import { Store } from '../Store'
import axios from 'axios'
import { NavLink} from 'react-router-dom'
import Swal from 'sweetalert2'
const Product = (props) => {
    const { product } = props
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;


    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            Swal.fire({
                title: 'Error',
                text: 'The product is out of stock',
                icon: 'error',
                showConfirmButton: false,
                timer: 2500
              })
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity }
        })
    }
    return (
        <Card className='product'>
            <NavLink to={`/product/${product.slug}`}>
                <img src={product.image} className='card-img-top' alt={product.name} title={product.name} />
            </NavLink>
            <Card.Body>
                <NavLink to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </NavLink>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>${product.price}</Card.Text>
                {product.countInStock === 0 ?
                    (<button  variant='light' disabled>Out of stock</button>) :
                    (<button className='btn' onClick={() => addToCartHandler(product)}>Add to cart</button>)}
                    <br/>
                    {/* <Button>test</Button> */}
            </Card.Body>
        </Card>
    )
}

export default Product