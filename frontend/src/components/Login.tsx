import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginUser } from "../store/userSlice";
import { Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(loginUser({ userData, navigate }));
    };

    return (
        <>
            <h1 className="w-11/12 mx-auto text-center text-3xl mt-4 mb-8">
                Let's log you in
            </h1>
            <form
                className="flex w-11/12 mx-auto flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                        type="email"
                        id="email1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="border bg-indigo-primary text-white py-3 rounded-lg hover:bg-indigo-secondary duration-150"
                >
                    Submit
                </button>
                <a href="/register" className="mx-auto text-blue-500 hover:underline">Create a new account?</a>
            </form>
            
        </>
    );
};

export default Login;
