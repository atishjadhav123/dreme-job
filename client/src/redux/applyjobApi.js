import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const applyjobApi = createApi({
    reducerPath: "applyjobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/applay`,
        credentials: "include",
    }),
    tagTypes: ["apply"],
    endpoints: (builder) => ({
        applyJob: builder.mutation({
            query: (jobId) => ({
                url: `/applyjob/${jobId}`,
                method: "POST",
            }),
            invalidatesTags: ["apply"],
        }),
        getApplicants: builder.query({
            query: (id) => ({
                url: `/${id}/aplicants`,
                method: "GET",
            }),
            providesTags: ["applicants"],
        }),
        getAppliedJob: builder.query({
            query: () => ({
                url: "/getapplyjob",
                method: "GET",
            }),
            providesTags: ["applicants"],
        }),
        updateApplicantStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/status/${id}/update`,
                method: "PUT",
                body: { status }
            }),
            invalidatesTags: ["company", "applicants"]
        })
    }),
})

export const { useApplyJobMutation,
    useUpdateApplicantStatusMutation,
    useGetAppliedJobQuery,
    useGetApplicantsQuery } = applyjobApi
