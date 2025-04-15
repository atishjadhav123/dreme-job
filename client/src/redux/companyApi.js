import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const companyApi = createApi({
    reducerPath: "companyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/company`,
        credentials: "include"
    }),
    tagTypes: ["company"],
    endpoints: (builder) => {
        return {
            GetCompanybyId: builder.query({
                query: (id) => {
                    return {
                        url: `/getbyid/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["company"]
            }),
            getAllComapany: builder.query({
                query: (id) => {
                    return {
                        url: "/getcompany",
                        method: "GET"
                    }
                },
                providesTags: ["company"]
            }),
            registerCompany: builder.mutation({
                query: userData => {
                    return {
                        url: "/registercompany",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["company"]
            }),
            updateCompany: builder.mutation({
                query: ({ id, formData }) => {
                    return {
                        url: `/updatecompany/${id}`,
                        method: "PUT",
                        body: formData,
                    }
                },
                invalidatesTags: ["company"],
            }),


        }
    }
})

export const { useRegisterCompanyMutation,
    useGetCompanybyIdQuery,
    useUpdateCompanyMutation,
    useGetAllComapanyQuery
} = companyApi
