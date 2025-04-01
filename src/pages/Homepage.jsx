import React from 'react'
import axios from 'axios'
async function  Homepage() {
  const token = localStorage.getItem('authToken');
  const username = await axios.get(`${BASE_URL}/getusername`, { headers: { Authorization: `Bearer ${token}` } });
  return (
    <div>
   homepage
    </div>
  )
}

export default Homepage
