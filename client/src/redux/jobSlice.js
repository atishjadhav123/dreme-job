import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allappliedJobs: [],
        searchedQuery: ""
    },
    reducers: {
        setallJobs: (state, action) => {
            state.alljobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setallappliedJobs: (state, action) => {
            state.allappliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        }
    }
})
export const { setallJobs, setSingleJob, setAllAdminJobs,
    setsearchJobByText, setallappliedJobs, setSearchedQuery } = jobSlice.actions
export default jobSlice.reducer