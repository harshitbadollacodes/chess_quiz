import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { API } from "../constants/config";
import { Link, useNavigate } from "react-router-dom";
import { ServerError } from "../types/types";

export function Signup() {

    const { setToken, setUserId } = useAuthContext();

    // const { state } = useLocation();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    async function signupFormHandler(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            
            if (firstName.length 
                && lastName.length 
                && email.length 
                && password.length 
                && (password === confirmPassword)
            ){
                const { data: { token, userId }, status } = await axios.post(`${API}/user/signup`, {
                    firstName,
                    lastName,
                    email,
                    password
                });

                // const userComingFrom = state?.from ? state.from : "/";

                if (status === 200) {
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("userId", JSON.stringify(userId));
                    localStorage.setItem("firstName", JSON.stringify(firstName));
                    setToken(token);
                    setUserId(userId);
                    navigate("/");
                }
            } else {
                setError("Password and Confirm Password are not matching");
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

    return (

        <div className="my-container flex flex-col items-center">

            <h1 className="text-4xl font-bold my-8 text-bold text-center dark:text-white">
                Signup
            </h1>

            {error && <h3 className="text-red-500 font-bold">{error}</h3>}
                
            <form 
                className="flex flex-col w-full justify-center items-center"
                onSubmit={signupFormHandler}
            >

                <input
                    type="text"
                    required
                    className="input-box"
                    value={firstName} 
                    placeholder="First Name" 
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    required
                    className="input-box"
                    value={lastName} 
                    placeholder="Last Name" 
                    onChange={(e) => setLastName(e.target.value)}
                />
                
                <input 
                    type="email" 
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

                <input 
                    type="password" 
                    required
                    className="input-box"
                    value={confirmPassword} 
                    placeholder="Confirm Password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <p className="dark:text-white mb-4">Have an account already? 
                    <span> <Link to="/login" className="text-blue-500">
                            Login
                        </Link> 
                    </span>
                </p>

                <input 
                    type="submit" 
                    value="Singup"
                    className="text-xl cursor-pointer transition hover:bg-blue-400 rounded-xl p-2 w-1/2 bg-blue-500"
                />                
            </form>
        </div>
    )
}