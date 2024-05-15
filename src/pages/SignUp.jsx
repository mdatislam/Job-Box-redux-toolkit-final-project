import { useForm, useWatch } from "react-hook-form";
import loginImage from "../assets/login.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createUser } from "../app/store/features/auth/authSlice";



const SignUp = () => {
  const navigate= useNavigate()
  const { handleSubmit, register, reset, control } = useForm();
  const dispatch= useDispatch()
  const [disabled,setDisabled]=useState(true)
  
 
  const password = useWatch({ control, name: "password" });
  //console.log(password)
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = (data) => {
    dispatch(createUser({email:data.email, password:data.password,role:data.role}))
    //console.log(data);
  };

  const {isLoading,email}= useSelector(state=>state.auth)
  //console.log(email)

  useEffect(()=>{
    if(!isLoading && email){
      navigate("/login")
      reset()
    } 
    
  },[isLoading,email])
  return (
    <div className='flex h-screen items-center pt-14'>
      <div className='w-1/2'>
        <img src={loginImage} className='h-full w-full' alt='' />
      </div>
      <div className='w-1/2 grid place-items-center'>
        <div className='bg-[#FFFAF4] rounded-lg grid place-items-center p-10'>
          <h1 className='mb-10 font-medium text-2xl'>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-3'>
              <div className='flex flex-col items-start'>
                <label htmlFor='email' className='ml-5'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  {...register("email")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='password' className='ml-5'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  {...register("password")}
                />
              </div>
              <div className='flex flex-col items-start'>
                <label htmlFor='confirm-password' className='ml-5'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirm-password'
                  {...register("confirmPassword")}
                />
              </div>

              <div className='flex flex-col items-start'>
                <label htmlFor='role' className='ml-5'>
                  Role
                </label>
                <input
                  type='text'
                  name='role'
                  id='role'
                  {...register("role")}
                />
              </div>

              <div className='!mt-8 '>
                <button
                  type='submit'
                  className='font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className='text-primary hover:underline cursor-pointer'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;