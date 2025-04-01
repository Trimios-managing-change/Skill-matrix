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



function Entermail() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <div className="forgotpassword-navbar">
                <img src={logoheader} alt="Logo" />
                <div className="login_signup">
                    <ul id='forgotpassword-ul'>
                        <Link to="/login" id='forgotpassword-login' style={{ textDecoration: 'none' }}><li id='forgotpassword-login'>Login</li></Link>

                    </ul>
                </div>
            </div>
            <div className="forgotpassword-form" >
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
                    <button id='forgotpassword-submit' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Entermail;
