import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Correctly using useNavigate

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post('https://127.0.0.1:4659/signup', {
            name,
            surname,
            email,
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
        <form onSubmit={handleSignup}>  {/* Corrected onSubmit */}
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
                <label>Email: </label>
                <input 
                    type="email"  // Using type="email" for email input
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
        </form>
    );
};

export default Signup;
