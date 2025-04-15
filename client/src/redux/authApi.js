import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/apiEndPoint",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),
            SignupUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            LoginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: (data) => {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    return data.user;
                },
            }),
            updateProfile: builder.mutation({
                query: (formData) => ({
                    url: "/profile/update",
                    method: "PUT",
                    body: formData,
                }),
                providesTags: ["auth"],
                invalidatesTags: ["auth"],
            }),
            logoutUser: builder.mutation({
                query: (formData) => ({
                    url: "/logout",
                    method: "DELETE",
                    body: formData,
                }),
                invalidatesTags: ["auth"],
                transformResponse: (data) => {
                    localStorage.removeItem("user", JSON.stringify(data.user));
                    return data.user;
                },
            }),


        }
    }
})

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useUpdateProfileMutation,
    useLogoutUserMutation
} = authApi
