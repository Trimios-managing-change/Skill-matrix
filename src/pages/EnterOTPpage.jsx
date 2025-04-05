import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import logoheader from '../assets/logo-header.svg'; // Import your logo image
import BASE_URL from '../config';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader'; // Importing the spinner

function EnterOTPpage() {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error('OTP must be 6 digits long.');
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const token = sessionStorage.getItem('resetPasswordToken');
            const response = await axios.post(`${BASE_URL}/auth/verify-otp`, { otp }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // Simulate OTP verification
            console.log(response.data); // Log the response for debugging
            if (response.status === 200) {
                const resettoken = response.data.token;
                console.log(resettoken);
                sessionStorage.setItem('resetToken', resettoken);

                toast.success('OTP Verified Successfully!');
                setTimeout(() => {
                    navigate('/resetpassword');
                }, 2000);
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="forgotpassword-container">
            <ToastContainer
                position="top-center"
                autoClose={1000}
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
                    <label id='forgotpassword-label' htmlFor="otp">Enter OTP</label>
                    <div className="forgotpassword-input-container">
                        <FontAwesomeIcon icon={faMessage} className="icon" />
                        <input
                            type="text"
                            id="forgotpassword-input"
                            name="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleChange}
                            maxLength="6"
                            inputMode="numeric"
                            required
                        />
                    </div>
                    <button id='forgotpassword-submit' type="submit" disabled={isLoading || otp.length !== 6}>
                        Verify
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

export default EnterOTPpage;
