import React from 'react';

import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { API } from "../constants/config";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router';
import { ServerError } from '../types/types';

export function LoginForm() {

    const { setToken, setUserId, setFirstName } = useAuthContext();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function loginHandler(e: React.FormEvent) {
        try {

            e.preventDefault();

            if (email.length > 0 && password.length > 0) {
                const {data: { firstName, token, userId }, status } = await axios.post(`${API}/user/login`, {
                    email,
                    password
                });

                if(status === 200) {
                    setFirstName(firstName);
                    setToken(token);
                    setUserId(userId);
                    localStorage.setItem("userId", JSON.stringify(userId));
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("firstName", JSON.stringify(firstName));
                    navigate("/");
                }
            } else {
                setError("Please enter email and password");
            }
            
        } catch(error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>;
                    if (serverError && serverError.response) {
                        console.log({serverError});
                        let errorMessage = serverError.response.data.message;
                        setError(errorMessage);
                    }
            }
        }
    }

    async function guestLogin() {
        try {
            const {data: { token, userId, firstName }, status } = await axios.post(`${API}/user/login`, {
                email: "guest@gmail.com",
                password: "guest"
            });

            if(status === 200) {
                setToken(token);
                setUserId(userId);
                localStorage.setItem("userId", JSON.stringify(userId));
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("firstName", JSON.stringify(firstName));
                console.log(JSON.stringify(token));
                navigate("/");
            }
        } catch(error) {
            console.log({error});
        }
    }


    return (
        <>
            <h1 className="text-4xl font-bold my-8 text-bold text-center dark:text-white">
                Login
            </h1>
            
            {error && <h3 className="text-red-500 font-bold">{error}</h3>}
            
            <form 
                className="flex flex-col w-full justify-center items-center"
                onSubmit={(e) => loginHandler(e)} 
            >
                
                <input 
                    type="text" 
                    required
                    className="input-box"
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <input 
                    type="password" 
                    required
                    className="input-box"
                    value={password} 
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p className="dark:text-white mb-4">Don't have an account? 
                    <span> <Link to="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </span>
                </p>

                <input 
                    type="submit" 
                    value="Login"
                    className="text-xl cursor-pointer transition hover:bg-blue-400 rounded-xl p-2 w-1/2 bg-blue-500"
                />
            </form>

            <div className="flex justify-center w-full">
                <button 
                    className="text-xl w-1/2 cursor-pointer transition hover:bg-blue-400 rounded-xl p-2 bg-blue-500 mt-4"
                    onClick={guestLogin}
                >
                    Guest Login
                </button>
            </div>


        </>
    )
}
