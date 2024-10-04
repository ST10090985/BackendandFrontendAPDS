import './signup.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    // const [surname, setSurname] = useState('');
    // const [idNumber, setIdNumber] = useState('');
    // const [accountNumber, setAccountNumber] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [paymentAmount, setpaymentAmount] = useState('');
    const [currency, setcurrency] = useState('');
    const [provider, setprovider] = useState(''); 
    const navigate = useNavigate();  // Correctly using useNavigate

    const navigateToCustomerLogin = () => {
        navigate('/login'); // Route to Employee Login/Sign up
      };
    

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post('https://127.0.0.1:4659/payement', {
         // fullname,
            // idNumber,
            // accountNumber,
            swiftCode,
            paymentAmount,
            currency,
            provider,
            
        })
        .then(response => {
            alert('Sign-up successful!');
            navigate('/');  // Navigates to the login page on success
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Sign-up failed. Please try again.');
        });
    };

    return (
<body>
    <div id="space"></div>
   
    <form onSubmit={handleSignup}>  {/* Corrected onSubmit */}
    <h1 id="signup-heading">Payment</h1>
        <div>
            <label>Currency: </label>
            <input 
                type="text" 
                value={currency} 
                onChange={(e) => setcurrency(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Amount: </label>
            <input 
                type="number" 
                value={paymentAmount} 
                onChange={(e) => setpaymentAmount(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Provider: </label>
            <input 
                type="text" 
                value={provider} 
                onChange={(e) => setprovider(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Swift Code: </label>
            <input 
                type="text" 
                value={swiftCode} 
                onChange={(e) => setSwiftCode(e.target.value)} 
                required 
            />
        </div>


        <div id="space2"></div>
   

        <button onClick={navigateToCustomerLogin} className="App-button">Pay Now</button>
    </form>
</body>
    )
};

export default Signup;
