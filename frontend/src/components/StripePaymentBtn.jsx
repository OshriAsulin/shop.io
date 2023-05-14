import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'


const StripePaymentBtn = ({ order, userInfo, orderId }) => {

    console.log(order.totalPrice)
    const priceForStripe = order.totalPrice * 100;
    const publishKey = 'pk_test_51N5omEDHCT4oK604qrNFRLXkhStZRi2YHgch9Ejn3mbJQ5xQ8yk49Eo65mLkfdv9mRc2sqZ8VDdvfzl20Z0SD7Zv00xuxBYIOm'

    const MySwal = withReactContent(Swal)

    const payNow = async token => {

        const data = { amount: order.totalPrice * 100, token }
        try {
            const response = await axios.post(`/api/orders/stripePayment`, data,
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );
            console.log('res-----',response)      
            if (response.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Payment was successful',
                    time: 4000,
                });
            }
            const transaction = response.data.details.transaction
            console.log(response.data.details.transaction)      
            const updateOrder = await axios.put(`/api/orders/updateOrder/${orderId}`, transaction,
                { headers: { authorization: `Bearer ${userInfo.token}` } }
            );

        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Payment was not successful',
                time: 4000,
            }); console.log(error);
        }
    }




    return (
        <div>
            <StripeCheckout
                stripeKey={publishKey}
                label='Pay Now'
                name='Pay With Credit Card'
                description={`your total is ${order.totalPrice}`}
                shippingAddress
                billingAddress
                amount={priceForStripe}
                token={payNow} />
        </div>
    )
}

export default StripePaymentBtn