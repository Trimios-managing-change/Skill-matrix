import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logoheader from '../assets/logo-header.svg';
import '../pagescss/Entermailpage.css'; // Import your CSS file for styling
import HashLoader from 'react-spinners/HashLoader'; // Importing the spinner

function Entermail() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });

            if (response.status === 200) {
                const { token } = response.data;
                sessionStorage.setItem('resetPasswordToken', token);
                toast.success('Email submitted successfully!');
                setTimeout(() => {
                    navigate('/forgotpassword/enterotp');
                }, 5000); // 5-second delay
            } else {
                toast.error('Failed to submit email. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="forgotpassword-container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Loader Display */}
            {isLoading && (
                <div className="loader-overlay">
                    <HashLoader color="#007bff" loading={true} size={60} />
                </div>
            )}

            <div className="forgotpassword-navbar">
                <img src={logoheader} alt="Logo" />
                <div className="login_signup">
                    <ul id='forgotpassword-ul'>
                        <Link to="/login" id='forgotpassword-login' style={{ textDecoration: 'none' }}>
                            <li id='forgotpassword-login'>Login</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="forgotpassword-form">
                <form id="forgotpassword-form" onSubmit={handleSubmit}>
                    <label id='forgotpassword-label' htmlFor="email">Enter your email address</label>
                    <div className="forgotpassword-input-container">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            type="email"
                            id="forgotpassword-input"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button id='forgotpassword-submit' type="submit" disabled={isLoading}>Submit</button>
                </form>
            </div>

            {/* Loader Styling */}
            <style>{`
                .loader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(255, 255, 255, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
            `}</style>
        </div>
    );
}

export default Entermail;
