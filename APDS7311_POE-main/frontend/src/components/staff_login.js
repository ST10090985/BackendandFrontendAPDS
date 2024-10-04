import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', {
            username,
            password
        })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);  // Correct use of setItem
            alert(response.data.message);
            navigate('./components/transactioncheckpoint');  // Redirect to homepage on successful login
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
        <h2 id="signup-heading">Log In : Employee</h2>

            <div>
                <label>Username: </label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}  // Correctly update email state
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
      ) ;
}
export default Login;
