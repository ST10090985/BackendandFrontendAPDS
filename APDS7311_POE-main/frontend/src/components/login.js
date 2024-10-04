import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://127.0.0.1:4659/login', {
            fullName,
            accountNumber,
            password
        })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);  // Correct use of setItem
            alert(response.data.message);
            navigate('./components/');  // Redirect to homepage on successful login
        })
        .catch(err => {
            console.error('Login failed:', err);
            alert('Login failed. Please try again.');
        });
    };

    return (

        <body>
             <div id="space"></div>
             
        <form onSubmit={handleLogin}>  {/* Corrected onSubmit */}
        <h2 id="signup-heading">Log In : Customer</h2>
            <div>
                <label>Full Name: </label>
                <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}  // Correctly update email state
                    required
                />
            </div>
            <div>
                <label>Account Number: </label>
                <input 
                    type="text" 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)}  // Correctly update email state
                    required
                />
            </div>
            <div>
                <label>Password: </label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  // Correctly update password state
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        </body>
    );
}

export default Login;
