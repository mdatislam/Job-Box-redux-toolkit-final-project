import { query } from "firebase/database";
import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        jobAdd: builder.mutation({
            query: (data) => ({
                url: "/job-add",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["jobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: "/apply",
                method: "PATCH",
                body: data
            }),
            invalidatesTags : ["applyJobs"]
        }),

        question: builder.mutation({
            query: (data) => ({
                url: "/question",
                method: "PATCH",
                body: data
            }),
            invalidatesTags : ["job"]
        }),

        replay: builder.mutation({
            query: (data) => ({
                url: "/replay",
                method: "PATCH",
                body: data
            }),
            invalidatesTags : ["job"]
        }),

        getJobs: builder.query({
            query: () => ({
                url: "/jobs"
            }),
            providesTags: ["jobs"],
        }),
        getJobBYId: builder.query({
            query: (id) => ({
                url: `/jobDetail/${id}`
            }),
            providesTags : ["applyJobs","job"]
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/appliedJob/${email}`
            }),
            providesTags : ["applyJobs",]
        }),
    }),

})

export const { useJobAddMutation,
    useGetJobsQuery,
    useGetJobBYIdQuery,
    useApplyMutation,useGetAppliedJobsQuery,
    useQuestionMutation,
    useReplayMutation
 } = jobApi