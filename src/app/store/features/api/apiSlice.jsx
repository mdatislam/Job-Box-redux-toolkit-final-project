import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiSlice= createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes:["jobs","applyJobs","job"],
    endpoints:(builder)=>({})
})
export default apiSlice


//import.meta.env.VITE_DEV_URL