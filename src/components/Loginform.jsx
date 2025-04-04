import React, { useState } from 'react';
import axios from 'axios';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

const LoginForm = ({ setFormType }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|net|gov|in|tech|ai)$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email must end with .com, .org, or .in');
        } else {
            setEmailError('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            validateEmail(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailError) {
            toast.error(emailError);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/login`, formData);

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('authToken', token);

                toast.success('Login successful!', { autoClose: 3000 });

                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                toast.error(`Login failed: ${response.statusText}`, { autoClose: 5000 });
            }
        } catch (error) {
            toast.error(`Error during login: ${error.response?.data?.message || error.message}`, { autoClose: 5000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginform'>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

            {/* Login Form */}
            <form className='formlogin' onSubmit={handleSubmit}>
                <div className="title">Login</div>

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
                {emailError && <p className="error-text">{emailError}</p>}

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

                <div className="forgot-password">
                    <p>
                        <Link to="/forgotpassword/entermail" className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </p>
                </div>

                <button id='loginsubmit' type="submit" disabled={loading || emailError}>Login</button>

                <p>
                    New to Skill Matrix?{' '}
                    <span onClick={() => setFormType('signup')} className="signup-link">
                        Join
                    </span>
                </p>
            </form>

            {/* Loader Overlay */}
            {loading && (
                <div className="loader-overlay">
                    <HashLoader color="#007bff" loading={true} size={60} />
                </div>
            )}

            <style>{`
                .forgot-password {
                    text-align: right;
                    margin-bottom: 5px;
                }
                .forgot-password-link {
                    color: #007bff;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .forgot-password-link:hover {
                    color: #0056b3;
                }
                .error-text {
                    color: red;
                    font-size: 12px;
                    margin-top: 5px;
                }
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

export default LoginForm;
