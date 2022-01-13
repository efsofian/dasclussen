import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price, }) => {
    const priceForStripe = price * 100;
    const publishableKey = process.env.REACT_APP_StripePublicKey;

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        })
            .then(response => {
                alert('succesful payment');
            })
            .catch(error => {
                console.log('Payment Error: ', error);
                alert('There was an issue with your payment! Please make sure you use the provided credit card.');
            });
    };

    return (
        <StripeCheckout label="Pay now"
        name="betapz club"
        billingAddress
        shippingAddress
        image="https://www.betapz.club/Sports-Tennis.ico"
        description={`Your total is ${price}`}
        amount={priceForStripe}
        panelLabel="Pay now"
        token={onToken}
        stripeKey={publishableKey}
    />);
};

export default StripeCheckoutButton;