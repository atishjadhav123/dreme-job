import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/job`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["job"],
    endpoints: (builder) => {
        return {
            getAlljobs: builder.query({
                query: () => {
                    return {
                        url: "/getjob",
                        method: "GET"
                    }
                },
                providesTags: ["job"]
            }),
            getjobsById: builder.query({
                query: (id) => {
                    return {
                        url: `/getjobbyid/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["job"]
            }),
            createJob: builder.mutation({
                query: userData => {
                    return {
                        url: "/createpost",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["company"]
            }),
        }
    }
})

export const { useGetAlljobsQuery,
    useGetjobsByIdQuery,
    useCreateJobMutation } = jobApi
