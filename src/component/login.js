import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./login.css";


const LoginForm = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validatePassword = (password) =>
    {
        // Password must be at least 8 characters, and contain at least 1 digit, uppercase letter, and special symbol
        const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&()_+={}[\]:;<>,.?/~]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate password
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters and contain at least 1 digit, uppercase letter, and special symbol.');
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:3010/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Assuming the server returns a JSON response
            const data = await response.json();
    
            // Handle the response data here (e.g., check for successful login)
            console.log('Server response:', data);
    
            // Replace the following line with your logic to navigate to another page
            // For example, you can use React Router: history.push('/another-page');
            navigate('/weather');
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred while processing your request. Please try again later.');
        }
    };
    

    return (
        <main className={styles}>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;