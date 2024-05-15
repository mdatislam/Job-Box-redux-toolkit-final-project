import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auth from "../../../../firebase/firebase.config"
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup
} from "firebase/auth"


const initialState = {
    userInfo: {email: "",role: ""},
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser", async ({ email, password }) => {
    //console.log(email)
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data.user.email
})

export const loginUser = createAsyncThunk("auth/logInUser", async ({ email, password, role }) => {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data.user.email
})

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const res = await fetch(`${import.meta.env.VITE_DEV_URL}/user/${email}`);
    const data = await res.json();
   // console.log(data)
    if (data.status) {
        return data
    }
    else {
        return email
    }
})

export const loginByGoogle = createAsyncThunk("auth/loginByGoogle", async () => {
    // console.log("click google")
    const googleProvider = new GoogleAuthProvider()
    const data = await signInWithPopup(auth, googleProvider)
    return data.user.email
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGOUT: (state) => {
            state.userInfo = {email:"",role:""},
                state.isLoading = false
        },
        userPersist: (state, { payload }) => {
            state.userInfo.email = payload,
                state.isLoading = false
        },
        loadingToggle: (state) => {
            state.isLoading = false

        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.error = ""
        })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false,
                    state.isError = false,
                    state.userInfo.email = payload,
                    state.error = ""
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.error = action.error.message,
                    state.userInfo.email = ""
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true,
                    state.isError = false,
                    state.error = ""
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false,
                    state.isError = false,
                    state.userInfo.email = payload,
                    state.error = ""
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.error = action.error.message,
                    state.userInfo.email = ""
            })
            .addCase(loginByGoogle.pending, (state) => {
                state.isLoading = true,
                    state.isError = false,
                    state.error = ""
            })
            .addCase(loginByGoogle.fulfilled, (state, { payload }) => {
                state.isLoading = false,
                    state.isError = false,
                    state.userInfo.email = payload,
                    state.error = ""
            })
            .addCase(loginByGoogle.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.error = action.error.message,
                    state.userInfo.email = ""
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true,
                    state.isError = false,
                    state.error = ""
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                if(payload.status){
                    state.userInfo= payload.data
                }
                else{
                    state.userInfo.email=payload
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.error = action.error.message,
                    state.userInfo.email = ""
            })
    }
})

export const { LOGOUT, userPersist, loadingToggle } = authSlice.actions
export default authSlice.reducer