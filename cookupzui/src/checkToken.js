import React from 'react';
import axios from "axios";


const checkTokenService = {
    validateToken: async function (token) {
        const jwtDecode = require('jwt-decode');
        const decodedToken = jwtDecode(token);
        const dateNow = new Date();
        console.log(decodedToken.exp * 1000);
        console.log(dateNow.getTime());
        if(decodedToken.exp * 1000 < dateNow.getTime()) {
            const user = JSON.parse(localStorage.getItem("user"));
           const refreshParams = {
                username: user.username,
                password: user.password,
                refresh: localStorage.getItem("refresh")
            };
            return axios.post('http://localhost:8000/users/token/refresh', refreshParams).then(res => {
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
            })
        } else {
            return token;
        }
    }
};

export default checkTokenService;