import './signup.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Correctly using useNavigate

    const navigateToCustomerLogin = () => {
        navigate('/login'); // Route to Employee Login/Sign up
      };
    

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post('https://127.0.0.1:4659/signup', {
            name,
            surname,
            idNumber,
            accountNumber,
            password
        })
        .then(response => {
            alert('Sign-up successful!');
            navigate('/login');  // Navigates to the login page on success
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
    <h1 id="signup-heading">Sign Up</h1>
        <div>
            <label>Name: </label>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Surname: </label>
            <input 
                type="text" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>ID Number: </label>
            <input 
                type="number" 
                value={idNumber} 
                onChange={(e) => setIdNumber(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Account Number: </label>
            <input 
                type="number" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)} 
                required 
            />
        </div>

        <div>
            <label>Password: </label>
            <input 
                type="password"  // Using type="password" for security
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
        </div>

        <button type="submit">Sign Up</button>

        <div id="space2"></div>
   

        <button onClick={navigateToCustomerLogin} className="App-button">Login</button>
    </form>
</body>
    )
};

export default Signup;
