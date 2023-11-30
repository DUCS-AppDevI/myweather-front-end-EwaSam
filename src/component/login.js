import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        // Validate password
        if (!validatePassword(password))
        {
            setError('Password must be at least 8 characters and contain at least 1 digit, uppercase letter, and special symbol.');
            return;
        }

        // Add any additional logic here (e.g., authentication, redirection to another page)

        // For demonstration purposes, let's just log the email and redirect to another page
        console.log('Email:', email);
        console.log('Password:', password);

        // Replace the following line with your logic to navigate to another page
        // For example, you can use React Router: history.push('/another-page');
        navigate('/weather');
    };

    return (
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
    );
};

export default LoginForm;