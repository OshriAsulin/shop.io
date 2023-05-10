import React, { useEffect, useReducer, useState } from 'react'
import style from '../styles/UploadStyles.module.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false };
        default:
            return state;
    }
};

const UploadProduct = ({ setOpen, userInfo }) => {

    const [
        {
            loading,
            error,
            products,
            loadingCreate
        }, dispatch,
    ] = useReducer(reducer, { loading: true, error: '' });



    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')


    const submitHandler = async (e) => {
        const output = {
            name: name,
            image: image,
            brand: brand,
            description: description,
            category: category,
            price: price,
            countInStock: countInStock,
        }
        console.log(output)
        e.preventDefault()
        console.log(userInfo)
        try {
            dispatch({ type: 'CREATE_REQUEST' });
            const data = await axios.post('/api/admin/addProduct', output,
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                })
            console.log(data)
            toast.success('The Product is added successfuly');
            dispatch({ type: 'CREATE_SUCCESS' });
            navigate(`/admin/products`);
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'UPDATE_FAIL' });
        }

    }
    return (
        <div className={style.uploadContainer}>
            <div className={style.wrapperContainer}>
                <div onClick={() => setOpen(false)} className={style.close}>X</div>
                <h3 className={style.title}>Add Product</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control value={name} placeholder='Name' required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control value={image} placeholder='Image' required onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
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
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control value={description} placeholder='Description' required onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control type='Number' placeholder='Price' value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label></Form.Label>
                        <Form.Control type='Number' placeholder='Count In Stock' value={countInStock} required onChange={(e) => setCountInStock(e.target.value)} />
                    </Form.Group>
                    <button className={style.sendButton}>Add</button>
                </Form>

            </div>
        </div>
    )
}

export default UploadProduct