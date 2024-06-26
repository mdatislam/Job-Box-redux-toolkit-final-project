
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginByGoogle, loginUser } from "../app/store/features/auth/authSlice";
import Loading from "./Shared/Loading";


//import toast from "react-hot-toast";
const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userInfo:{isLoading, email,isError,error}} = useSelector(state => state.auth)
  
  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }))
  };

 let Error
 
  const handleGoogleLogin=()=>{
    dispatch(loginByGoogle())
  }

  useEffect(()=>{
    if(!isLoading && email){
      navigate("/home")
    } 
    
  },[isLoading,email])


  useEffect(()=>{
    if(isError){
      //toast.error(error)
    } 
    
  },[isError,error])

  if(isLoading){
<Loading/>
  }

  return (
    <div className='flex h-screen items-center'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input type='email' {...register("email")} id='email' />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              {
                isError && <p className="text-red-500">{error}</p>
              }
              <div className='relative !mt-8'>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full'
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/signUp")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
              <div className='relative  mt-8' >
                <button onClick={handleGoogleLogin}
                 className='font-bold text-white py-3 rounded-full bg-green-500 w-full'>
                  Login By Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
