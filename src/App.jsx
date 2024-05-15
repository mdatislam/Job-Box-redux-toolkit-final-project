import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './layout/main/Main'
import { router } from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import auth from './firebase/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { getUser, loadingToggle, userPersist } from './app/store/features/auth/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //console.log(user)
      if(user){
        dispatch(getUser(user.email))
      }
      else{
        dispatch(loadingToggle())
      }
          
    })
  }, [])

  return (
    <>

      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}

export default App
