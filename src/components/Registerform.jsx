import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
import HashLoader from 'react-spinners/HashLoader'; // Import the spinner

const RegisterForm = ({ setFormType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: '',
    });
    const [error, setError] = useState(''); // To store validation errors
    const [isLoading, setIsLoading] = useState(false); // Manage loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'email') {
            const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|net|gov|in|tech|ai)$/;
            if (!emailRegex.test(value)) {
                setError('Email must end with .com, .org, or .in');
            } else {
                setError('');
            }
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
            if (!passwordRegex.test(value)) {
                setError('Password must contain at least one uppercase letter and one special character.');
            } else {
                setError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) {
            toast.error(error); // Show error toast if validation fails
            return;
        }

        setIsLoading(true); // Start loading
        try {
            console.log(formData); // Log form data for debugging
            const response = await axios.post(`${BASE_URL}/register`, formData);
            
            if (response.status === 200) {
                const { token } = response.data; // Extract token from backend response

                // Store login status and auth token
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('authToken', token);
                toast.success('Registration successful!', { autoClose: 3000 });
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                toast.error(`Registration failed: ${response.statusText}`, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error during registration.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="registerform">
            <ToastContainer 
                position="top-center" 
                autoClose={3000} 
                hideProgressBar={false} 
                closeOnClick 
                pauseOnHover 
                draggable 
            />

            {/* Show the loader while the form is submitting */}
            {isLoading && (
                <div className="loader-overlay">
                    <HashLoader color="#007bff" loading={true} size={60} />
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="title">Register</div>

                <div className="input-group">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display validation error */}

                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} />
                    <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select user type</option>
                        <option value="STUDENT">Student/Fresher</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ORGANIZATION">Organization</option>
                        <option value="HR">H.R</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading || error}>Register</button>

                <p>
                    Already have an account?{' '}
                    <span onClick={() => setFormType('login')} className="signup-link">
                        Login
                    </span>
                </p>
            </form>

            {/* Styles for the loader overlay */}
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
};

export default RegisterForm;
