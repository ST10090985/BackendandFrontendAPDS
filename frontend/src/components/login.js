import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://127.0.0.1:4659/login', {
            email,
            password
        })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);  // Correct use of setItem
            alert(response.data.message);
            navigate('/');  // Redirect to homepage on successful login
        })
        .catch(err => {
            console.error('Login failed:', err);
            alert('Login failed. Please try again.');
        });
    };

    return (
        <form onSubmit={handleLogin}>  {/* Corrected onSubmit */}
            <div>
                <label>Email: </label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}  // Correctly update email state
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
    );
}

export default Login;
