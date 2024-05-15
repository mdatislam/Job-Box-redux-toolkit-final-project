import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../app/store/features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { userInfo: { email, role } } = useSelector(state => state.auth)
  //console.log(email, role)
  const handleLogOut = () => {
    signOut(auth)
      .then(dispatch(LOGOUT()))
    navigate("/login")
  }
  return (
    <nav className={`h-14 fixed w-full rounded-lg  mx-auto z-[999] ${pathname === "/" ? "bg-green-300" : "bg-blue-300"
      }`}>
      <ul className='max-w-7xl  flex gap-3 h-full items-center text-white'>
        <li className='flex-auto font-semibold text-2xl '>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>

        {email && !role && <li>
          <Link className='hover:text-primary' to='/register'>
            GetStarted
          </Link>
        </li>
        }
        {email && role && <li>
          <Link className='hover:text-primary' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        }
         <Link to="/home">Home</Link>
        <Link to="/about">About</Link> 

        <Link to="/signUp">SignUp</Link>
        {email ? <button onClick={handleLogOut} className="
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all">
          logOut </button>
          : <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/login'
            >
              Login
            </Link>
          </li>}
      </ul>
    </nav>
  );
};

export default Navbar;