import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

function HomepageStudent() {
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responce = await axios.get(`${BASE_URL}/student}`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(responce.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            <h1>Welcome {userData}</h1>
        </div>
    );
}

export default HomepageStudent;

