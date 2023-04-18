import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card >
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className='card-img-top' alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                <Card.Text>${product.price}</Card.Text>
                <button className='bt'>Add to cart</button>
            </Card.Body>
        </Card>
    )
}

export default Product