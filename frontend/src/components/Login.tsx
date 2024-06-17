import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginUser } from "../store/userSlice";
import { Label } from "flowbite-react";
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
        <main>
            <h1 className="w-11/12 mx-auto text-center text-3xl mt-4 mb-8 text-white font-inter">
                Let's log you in
            </h1>
            <form
                className="flex w-11/12 mx-auto flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Your email"
                            className="text-white"
                        />
                    </div>
                    <input
                        className="w-full py-2 px-3 rounded-md"
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
                        <Label
                            htmlFor="password1"
                            value="Your password"
                            className="text-white"
                        />
                    </div>
                    <input
                        className="w-full py-2 px-3 rounded-md"
                        placeholder="********"
                        id="password1"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-primary text-white py-3 rounded-lg hover:bg-indigo-secondary duration-150"
                >
                    Submit
                </button>
                <a
                    href="/register"
                    className="mx-auto text-blue-400 hover:underline"
                >
                    Create a new account?
                </a>
            </form>
        </main>
    );
};

export default Login;
