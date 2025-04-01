import React, { useState } from 'react';
import axios from 'axios';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
import { Link } from 'react-router-dom';

// Login Form Component
function LoginForm({ setFormType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data; // Extract token from backend response

                // Store login status and auth token
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('authToken', token);

                toast.success('Login successful!', { autoClose: 5000 });

                // Redirect to home after a delay
                setTimeout(() => {
                    navigate('/home');
                }, 5000);
            } else {
                toast.error(`Login failed: ${response.statusText}`, { autoClose: 5000 });
            }
        } catch (error) {
            toast.error(`Error during login: ${error.response?.data?.message || error.message}`, { autoClose: 5000 });
        }
    };

    return (
        <div className='loginform'>
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
            <form className='formlogin' onSubmit={handleSubmit}>
                <div className="title">Login</div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <button id='loginsubmit' type="submit">Login</button>

                <p>
                    New to Skill Matrix?{' '}
                    <span onClick={() => setFormType('signup')} className="signup-link">
                        Join
                    </span>
                </p>
            </form>

            {/* Remove JSX attribute from <style> */}
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
            `}</style>
        </div>
    );
}

export default LoginForm;
