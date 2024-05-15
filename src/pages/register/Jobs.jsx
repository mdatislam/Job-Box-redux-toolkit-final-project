import React from "react";
import { useGetJobsQuery } from "../../app/store/features/job/jobApi";
import Loading from "../Shared/Loading";
import JobCard from "../component/JobCard";



const Jobs = () => {
const {data, isLoading, isError}= useGetJobsQuery()
 // console.log(data)
  if(isLoading){
    return <Loading />
  }
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'> total job :{data.jobData?.length}</h1>
        <div className="grid grid-cols-2 gap-2">
        {
          
          data?.jobData?.map((jobData)=>
          (
        
        <JobCard jobData={jobData} key={jobData._id} />
        )
              
          )
          
        }
        </div>
      </div>
      
    </div>
  );
};

export default Jobs;

{/* <div className='grid grid-cols-2 gap-5 mt-5'>
<JobCard jobData={jobData} key={jobData._id} />
</div> */}