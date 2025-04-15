import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload))
            } else {
                localStorage.removeItem("user")
            }
        },
    }
})

export const { setLoading, setUser } = authSlice.actions
export default authSlice.reducer
