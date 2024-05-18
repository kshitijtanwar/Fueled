import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "../store/userSlice";
import { Label, TextInput } from "flowbite-react";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactInfo, setContactInfo] = useState<number | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (contactInfo !== undefined) {
            dispatch(
                registerUser({
                    user: { username, password, email },
                    contact_info: contactInfo,
                })
            );
        }
    };

    return (
        <>
            <h1 className="w-11/12 mx-auto text-center text-3xl mt-4 mb-8">
                Create your account
            </h1>
            <form
                className="flex w-11/12 mx-auto flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="contactInfo" value="Contact Info" />
                    </div>
                    <TextInput
                        id="contactInfo"
                        type="text"
                        value={contactInfo !== undefined ? contactInfo.toString() : ""}
                        onChange={(e) => setContactInfo(parseInt(e.target.value) || undefined)}
                        placeholder="Contact Info"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="border bg-indigo-primary text-white py-3 rounded-lg hover:bg-indigo-secondary duration-150"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Register"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <a href="/login" className="mx-auto text-blue-500 hover:underline">Already have an account? Log in</a>
            </form>
        </>
    );
};

export default Register;
