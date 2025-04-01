import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../config';
import logoheader from '../assets/logo-header.svg';


function Resetpassword() {
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const token = sessionStorage.getItem('resetToken');
            const response = await axios.put(`${BASE_URL}/auth/reset-password`, {
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status == 200) {
                 toast.success(response.data.message || 'Password reset successfully!');
            setTimeout(() => {
                navigate('/home');
            }, 2000); // Navigate after a short delay to allow the toast to display
            }
            
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while resetting the password.');
        }
    };

    return (
        <div className="forgotpassword-container">
            <div className="forgotpassword-navbar">
                <img src={logoheader} alt="Logo" />
                <div className="login_signup">
                    <ul id='forgotpassword-ul'>
                        <Link to="/login" id='forgotpassword-login' style={{ textDecoration: 'none' }}><li id='forgotpassword-login'>Login</li></Link>

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
                    <button id="forgotpassword-submit" type="submit">
                        Reset Password
                    </button>
                </form>
            </div>
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
        </div>

    );
}

export default Resetpassword;
