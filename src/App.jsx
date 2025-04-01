import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Homepage from './pages/Homepage'; // Import Home Page
import ProtectedRoute from './components/ProtectedRoute'; // Import Protected Route
import Entermail from './pages/EntermailPage'; // Import Entermail Component
import EnterOTPpage from './pages/EnterOTPpage'; // Import EnterOTP Component
import Resetpassword from './pages/Resetpassword';

import { ProtectedResetRoute } from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        {/* Route for the login page */}
        <Route path="/" element={<Loginpage />} />

        {/* Protected Route for Home */}
        {/* Route for the homepage, accessible only through ProtectedRoute */}
        
          <Route path="/home" element={<Homepage />} />
          

        {/* Redirect unknown routes to login */}
        {/* Catch-all route to redirect any unknown paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Forgot Password Routes */}
        {/* Route for entering email during password reset */}
        <Route path='/forgotpassword/entermail' element={<Entermail />} />

         <Route element={<ProtectedResetRoute />}>
        <Route path='/forgotpassword/enterotp' element={<EnterOTPpage />} />
        </Route>

        {/* Route for resetting password */}
        <Route element={<ProtectedResetRoute />}>
        <Route path='/resetpassword' element={<Resetpassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
