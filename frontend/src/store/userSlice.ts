import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState, SignUpType, LoginType, ErrorType } from "../definitions";
import { userprofile } from "../constants/constants";
import toast from "react-hot-toast";

const initialState: UserState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
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
                userData,
                { withCredentials: true }
            );
            toast.dismiss();
            navigate("/events"); // Navigate after successful login

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
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (navigate: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${userprofile}/user/logout/`,
                {},
                {
                    withCredentials: true,
                }
            );
            toast.success("Logged out successfully"); // Show toast notification
            navigate("/login");
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorType;
                toast.error(errorResponse.error); // Show error toast
                return rejectWithValue(errorResponse);
            } else {
                toast.error("An unexpected error occurred"); // Show error toast
                return rejectWithValue({
                    error: "An unexpected error occurred",
                });
            }
        }
    }
);
export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${userprofile}/user/profile/`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorType;
                return rejectWithValue(errorResponse);
            } else {
                return rejectWithValue({
                    error: "An unexpected error occurred",
                });
            }
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
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to logout";
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
