import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const PaymentForm = ({ amount, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    // 1. Create paymentIntent from backend
    useEffect(() => {
        if (!amount) return;
        fetch('http://localhost:3000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: amount }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const card = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                },
            },
        );

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else {
            onPaymentSuccess(paymentIntent);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <CardElement className="border p-3 rounded" />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="btn bg-primary text-secondary"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default PaymentForm;
