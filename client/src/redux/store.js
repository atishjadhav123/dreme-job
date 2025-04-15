import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from './authSlice'
import jobSlice from './jobSlice'
import companySlice from './companySlice'
import { jobApi } from "./jobApi";
import { applyjobApi } from "./applyjobApi";
import { companyApi } from "./companyApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [applyjobApi.reducerPath]: applyjobApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        auth: authSlice,
        job: jobSlice,
        company: companySlice,
    },
    middleware: def => [...def(), authApi.middleware,
    jobApi.middleware,
    applyjobApi.middleware,
    companyApi.middleware,
    ]
})

export default reduxStore