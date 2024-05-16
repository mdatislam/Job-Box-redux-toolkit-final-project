import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/home/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import About from "../pages/home/About";
import PrivateRoute from "../pages/utils/PrivateRoute";
import AccountCreator from "../pages/register/AccountCreator";
import Dashboard from "../layout/dashboard/Dashboard";
import CandidateRegistration from "../pages/register/CandidateRegistration";
import EmployerRegistration from "../pages/register/EmployerRegistration";
import AddJob from "../pages/employeeDashboard/AddJob";
import Jobs from "../pages/register/Jobs";
import JobDetails from "../pages/register/JobDetails";
import AppliedJobs from "../pages/cadidatesDashboard/AppliedJobs";
import NotFound from "../pages/Shared/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children:
            [
                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "about",
                    element: <About />
                },

                {
                    path: "/signUp",
                    element: <SignUp />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: (<PrivateRoute>
                        <AccountCreator />
                    </PrivateRoute>
                    )
                },
                {
                    path: "/register/candidate",
                    element: <CandidateRegistration />
                },
                {
                    path: "/register/employer",
                    element: <EmployerRegistration />
                },
                {
                    path:"/jobs",
                    element: <Jobs />
                },
                {
                    path:"/job-details/:id",
                    element:<JobDetails />
                },
                {
                    path:"*",
                    element:<NotFound />
                },

            ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,

        children:
            [
                {
                    path:"/dashboard/add-job",
                    element: <AddJob />
                },
                {
                    path:"/dashboard/applied-job",
                    element: <AppliedJobs />
                },


            ]
    }

])

