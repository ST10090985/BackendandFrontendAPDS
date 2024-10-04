import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch payments on component mount
        axios.get('http://localhost:3000/payments')
            .then(response => {
                setPayments(response.data.data);  // Assume response contains payment data
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch payments');
                setLoading(false);
            });
    }, []);

    const verifyPayment = (id) => {
        axios.patch(`http://localhost:3000//payments/verify/${id}`)
            .then(response => {
                alert('Payment verified successfully');
                // Optionally re-fetch the payments to update the list
            })
            .catch(err => {
                alert('Failed to verify payment');
                console.error(err);
            });
    };

    const denyPayment = (id) => {
        axios.patch(`http://localhost:3000/payments/deny/${id}`)
            .then(response => {
                alert('Payment denied');
                // Optionally re-fetch the payments to update the list
            })
            .catch(err => {
                alert('Failed to deny payment');
                console.error(err);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Payments</h1>
            <ul>
                {payments.map(payment => (
                    <li key={payment._id}>
                        <strong>Amount:</strong> {payment.paymentAmount} {payment.currency} <br />
                        <strong>fullName:</strong> {payment.fullName} <br />
                        <strong>Account Number:</strong> {payment.accountNumber} <br />
                        <strong>Provider:</strong> {payment.provider} <br />
                        <strong>swift Code:</strong> {payment.swiftCode} <br />
                        <strong>Status:</strong> {payment.status} <br />
                        <button onClick={() => verifyPayment(payment._id)}>Verify</button>
                        <button onClick={() => denyPayment(payment._id)}>Deny</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Payments;
