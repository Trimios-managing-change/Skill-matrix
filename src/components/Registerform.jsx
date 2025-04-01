import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';

const RegisterForm = ({ setFormType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: '', // Ensure this matches the select input value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
            }
            else {
                toast.error(`Registration failed: ${response.statusText}`, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error during registration.');
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

                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} />
                    <select
                        name="userType" // Ensure name is correct
                        value={formData.userType} // This ensures the value is properly set
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select user type</option>
                        <option value="student/fresher">Student/Fresher</option>
                        <option value="employeed">Employee</option>
                        <option value="organization">Organization</option>
                        <option value="hr">H.R</option>
                    </select>
                </div>

                <button type="submit">Register</button>

                <p>
                    Already have an account?{' '}
                    <span onClick={() => setFormType('login')} className="signup-link">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
