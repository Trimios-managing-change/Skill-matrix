import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../config';
import logoheader from '../assets/logo-header.svg';
import HashLoader from 'react-spinners/HashLoader'; // Importing the spinner

function Resetpassword() {
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const token = sessionStorage.getItem('resetToken');
            const response = await axios.put(`${BASE_URL}/auth/reset-password`, {
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message || 'Password reset successfully!');
                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Navigate after a short delay to allow the toast to display
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while resetting the password.');
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
                    <label id="forgotpassword-label" className="reset-password-label">
                        Reset Password
                    </label>
                    <div className="forgotpassword-input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type="password"
                            id="forgotpassword-input"
                            name="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="forgotpassword-input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type="password"
                            id="forgotpassword-input"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button id="forgotpassword-submit" type="submit" disabled={isLoading}>
                        Reset Password
                    </button>
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

export default Resetpassword;
