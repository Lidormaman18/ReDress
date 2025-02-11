import React, { useState } from 'react';
import SignUpModal from './SignUpModal';
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' }); // פרטי ההתחברות

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', { // כאן הכתובת
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                navigate('/dashboard'); // ניוד לעמוד Dashboard
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Server error');
        }
    };


    return (
        <div className="login-container">
            <h1 className="title">ReDress</h1>
            <p className="subtitle">
                ReDress - Where Fashion Meets Sustainability!<br />
                How many times have you bought an outfit for a special occasion, worn it once, and let it sit in your closet?<br />
                With ReDress, you can turn your wardrobe into a source of income, rent out your clothes, and discover stunning items to rent near you.<br />
                Our app is location-based, making it easy and convenient to rent or lend outfits to people right in your area.<br />
                Connect with fashion in a whole new way and contribute to a more sustainable future!
            </p>
            <div className="login-box">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="login-input"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <p className="register-text">
                    Don't have an account?{" "}
                    <button onClick={openModal} className="register-link">Sign up</button>
                </p>
            </div>
            <SignUpModal isOpen={isModalOpen} onClose={closeModal} />
            <footer className="footer">
                Created by Shir Berko, Peleg Marely, Tal Aharon, Lidor Maman
            </footer>
        </div>
    );
}

export default Login;
