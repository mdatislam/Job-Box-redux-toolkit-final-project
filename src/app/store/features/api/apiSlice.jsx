import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice= createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DEV_URL
    }),
    tagTypes:["jobs","applyJobs","job"],
    endpoints:(builder)=>({})
})
export default apiSlice