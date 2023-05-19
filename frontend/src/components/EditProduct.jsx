import React, { useEffect, useReducer, useState } from 'react'
import style from '../styles/UploadStyles.module.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import { useNavigate } from 'react-router-dom'

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'UPDATE_FAIL':
            return { ...state, loadingCreate: false };
        default:
            return state;
    }
};

const EditProduct = ({ setOpen, userInfo, product }) => {
    const navigate = useNavigate();

    const [{ loading, error, products, loadingCreate }, dispatch] = useReducer(reducer, { loading: true, error: '' });

    const [name, setName] = useState(product.name)
    const [image, setImage] = useState(product.image)
    const [brand, setBrand] = useState(product.brand)
    const [description, setDescription] = useState(product.description)
    const [category, setCategory] = useState(product.category)
    const [price, setPrice] = useState(product.price)
    const [countInStock, setCountInStock] = useState(product.countInStock)

    // console.log(userInfo.name)

    const submitHandler = async (e) => {
        const output = {
            id: product._id,
            name: name,
            image: image,
            brand: brand,
            description: description,
            category: category,
            price: price,
            countInStock: countInStock,
        }
        console.log('output', output)
        e.preventDefault()
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            const data = await axios.put('/api/admin/updateProduct', output,
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                })
            console.log(data)
            console.log("product updated")
            // navigate(`/admin/products`);
            window.location.href = '/admin/products';
            toast.success('The Product is edited successfuly');

            dispatch({ type: 'UPDATE_SUCCESS' });
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'UPDATE_FAIL' });
        }

    }
    return (
        <div className={style.uploadContainer}>
            <div className={style.wrapperContainer}>
                <div onClick={() => setOpen(false)} className={style.close}>X</div>
                <h3 className={style.title}>Edit Product</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control value={name} placeholder='Name' required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label></Form.Label>
                        <Form.Control value={image} placeholder='Image' required onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="brand">
                        <Form.Label></Form.Label>
                        <Form.Control value={brand} placeholder='Brand' required onChange={(e) => setBrand(e.target.value)} />
                    </Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} >
                        <option>Open this select menu</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Pants">Pants</option>
                        <option value="Shoes">Shoes</option>
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label></Form.Label>
                        <Form.Control value={description} placeholder='Description' required onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label></Form.Label>
                        <Form.Control type='Number' placeholder='Price' value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="number">
                        <Form.Label></Form.Label>
                        <Form.Control type='Number' placeholder='Count In Stock' value={countInStock} required onChange={(e) => setCountInStock(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' className={style.sendButton}>Update</Button>
                </Form>

            </div>
        </div>
    )
}

export default EditProduct