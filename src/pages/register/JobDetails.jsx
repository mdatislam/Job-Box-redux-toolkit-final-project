import React, { useEffect, useState } from "react";

import meeting from "../../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import { useApplyMutation, useGetAppliedJobsQuery, useGetJobBYIdQuery, useQuestionMutation, useReplayMutation } from "../../app/store/features/job/jobApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const JobDetails = () => {
  const [replay,setReplay]= useState("")
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  //console.log(userInfo)
  const { id } = useParams()
  //console.log(id)
  const { register, handleSubmit, reset } = useForm()
  const { data, isLoading } = useGetJobBYIdQuery(id)
  //console.log(data?.jobInfo?.askQuestion)
  //const {data,isLoading}=useGetAppliedJobsQuery(email)
  const [applyJob, { isError }] = useApplyMutation()
  const [sendQuestion,{status:queStatus}] = useQuestionMutation()
const [replaySend , {status,isSuccess}]=useReplayMutation()
//console.log(queStatus,status,isSuccess)
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
  } = data?.jobInfo || {};



  const handleApply = () => {
    if (userInfo.role === "employer") {
      return (
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need a applicant account!",
        })
      )
    }

    if (userInfo.role === "") {
      navigate("/signUp")
      return
    }

    const data = {
      applicantId: userInfo._id || "",
      applicantEmail: userInfo.email || "",
      jobId: _id

    }
    console.log(data)
    applyJob(data)

  }

  const submitQuestion = (data) => {
    console.log(data)
    const sendingInfo = {
      ...data,
      userId: userInfo._id,
      jobId: _id,
      userEmail: userInfo.email,
      
    }
    sendQuestion(sendingInfo)
    reset()
    
  }

  const handleReplay= (id,question)=>{
    
    const replayData= {
      replayMsg:replay,
      question,
      askerId:id,
      jobId:_id
    }
    console.log(replayData)
    replaySend(replayData)     
    
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className='pt-14 grid grid-cols-12 gap-5'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            <button onClick={handleApply} className='btn'>Apply</button>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {data?.jobInfo?.askQuestion?.map(({ question, email, replay, _id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {replay?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}
                  
                    {userInfo.role === "employer" && <div className='flex gap-3 my-5'>
                      <input placeholder='Reply' type='text' className='w-full' 
                      onBlur={(e)=>setReplay(e.target.value)}
                      />
                      <button
                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                        type='button'
                        onClick={()=>handleReplay(_id,question)}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>}
                  
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(submitQuestion)}>
              {userInfo.role === "candidate" && <div className='flex gap-3 my-5'>
                <input
                  placeholder='Ask a question...'
                  type='text'
                  className='w-full'
                  {...register("question")}
                />
                <button
                  className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                  type='submit'
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>}
            </form>
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default JobDetails;
