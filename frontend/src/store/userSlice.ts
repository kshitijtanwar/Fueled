import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState, SignUpType, LoginType, ErrorType } from "../definitions";
import { userprofile } from "../constants/constants";
import toast from "react-hot-toast";


const initialState: UserState = {
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "user/register",
    async (userData: SignUpType) => {
        try {
            toast.loading("Registering you up", { id: "registering" });
            const response = await axios.post(`${userprofile}/user/register/`, {
                user: {
                    username: userData.user.username,
                    password: userData.user.password,
                    email: userData.user.email,
                },
                contact_info: userData.contact_info,
            });
            toast.success("Registered!", { id: "registering" });
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorType;
                toast.error(errorResponse.error, { id: "registering" });
            } else {
                toast.error("An unexpected error occurred", {
                    id: "registering",
                });
            }
            throw error; // Re-throw the error to handle it in the reducer
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async ({ userData, navigate }: { userData: LoginType; navigate: any }) => {
        try {
            toast.loading("Logging you in", { id: "logging" });
            const response = await axios.post(
                `${userprofile}/user/login/`,
                userData
            );
            toast.success("Logged in", { id: "logging" });
            navigate("/main"); // Navigate after successful login
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorType;
                toast.error(errorResponse.error, { id: "logging" });
            } else {
                toast.error("An unexpected error occurred", { id: "logging" });
            }
            throw error; // Re-throw the error to handle it in the reducer
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to register";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to login";
            });
    },
});


export default userSlice.reducer;
