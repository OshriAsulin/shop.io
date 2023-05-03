import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import logger from 'use-reducer-logger'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}


const HomeScreen = () => {
    // const [products, setProducts] = useState([])
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const res = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
                console.log(res.data)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
                console.log(err)
                // setProducts(res.data)
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            <Helmet>
                <title>shop.io</title>
            </Helmet>
            <h1>Featured products</h1>
            <div className='products'>

                {
                    loading ? (<LoadingBox/>) :
                        error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                            (<Row>
                                {products.map((product) => (
                                    <Col sm={6} md={4} lg={3} key={product.slug} className="mb-3">
                                        <Product product={product} ></Product>
                                    </Col>
                                ))
                                }
                            </Row>)

                }

            </div>
        </div>
    )
}

export default HomeScreen


// return (
//     <div className='product' key={index}>
//         <Link to={`/product/${product.slug}`}>
//             <img src={product.image} alt={product.name} />
//         </Link>
//         <div className='product-info'>
//             <Link to={`/product/${product.slug}`}>
//                 <p>{product.name}</p>
//             </Link>
//             <p>
//                 <strong>${product.price}</strong>
//             </p>
//             <button>Add to cart</button>
//         </div>
//     </div>
// )

