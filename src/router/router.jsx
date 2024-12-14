import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplication from "../pages/MyApplication/MyApplication";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>Route Not Found</h2>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path:'/jobs/:id',
          element : <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
          loader: ({params})=> fetch(`https://job-portal-server-one-beryl.vercel.app/jobs/${params.id}`)    
        },
        {
          path:'/jobApply/:id',
          element: <PrivateRoute> <JobApply></JobApply> </PrivateRoute>
        },
        {
          path: '/myApplications',
          element: <PrivateRoute> <MyApplication></MyApplication> </PrivateRoute>
        },
        {
          path: '/ViewApplications/:job_id',
          element: <PrivateRoute> <ViewApplications></ViewApplications> </PrivateRoute>,
          loader: ({params})=> fetch(`https://job-portal-server-one-beryl.vercel.app/job-application/jobs/${params.job_id}`)
        
        },
        {
          path: '/addJob',
          element: <PrivateRoute> <AddJob></AddJob> </PrivateRoute>
        },
        {
          path: '/myPostedJobs',
          element: <PrivateRoute> <MyPostedJobs></MyPostedJobs> </PrivateRoute>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'signin',
          element: <SignIn></SignIn>
        }

      ]
    },
  ]);
  export default router;