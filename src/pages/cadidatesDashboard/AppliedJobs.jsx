import React from "react";
import { useSelector } from "react-redux";
import Loading from "../Shared/Loading";
import JobCard from "../component/JobCard";
import { useGetAppliedJobsQuery } from "../../app/store/features/job/jobApi";


const AppliedJobs = () => {
  const { userInfo: { email } } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
console.log(data?.appliedJob)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.appliedJob?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
