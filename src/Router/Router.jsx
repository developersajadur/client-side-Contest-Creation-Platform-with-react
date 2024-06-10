import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "@/Forms/Login";
import Register from "@/Forms/Register";
import Challenges from "@/Pages/Challenges/Challenges";
import AddContests from "@/Forms/AddContests";
import ChallengeDetails from "@/Pages/Challenges/ChallengeDetails";
import DashBoard from "@/Layout/DashBoard";
import ManageContests from "@/Dashboard/Admin/ManageContests";
import UpdateContest from "@/Forms/UpdateContest";
import ManageUsers from "@/Dashboard/Admin/ManageUsers";
import ManagePayment from "@/Dashboard/Admin/ManagePayment";
import ContestRequest from "@/Dashboard/Admin/ContestRequest";
import MyAddedContests from "@/Dashboard/Admin/MyAddedContests";
import SubmittedContests from "@/Dashboard/Admin/SubmittedContests";
import UserDashboard from "@/Dashboard/User/UserDashboard";
import PrivateRoute from "@/PrivateRoutes/PrivateRoute";
import LeaderBoard from "@/Pages/Challenges/LeaderBoard/LeaderBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },{
        path: "/profile",
        element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>
      },
      {
        path:"/register",
        element:<Register></Register>
      },{
        path:"/challenges",
        element:<Challenges></Challenges>
      },{
        path:"/leader-board",
        element:<LeaderBoard></LeaderBoard>
      },
      {
        path:"/contest/:contestName",
        element:<PrivateRoute><ChallengeDetails></ChallengeDetails></PrivateRoute>,
        loader: ({ params }) => {
          const contestName = params.contestName.replace(/-/g, ' ');
          return fetch(`${import.meta.env.VITE_API_URL}/contests/${contestName}`);
        }
      },{
        path:"/dashboard",
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children:[
          {
            path:"add-contest",
            element:<PrivateRoute><AddContests></AddContests></PrivateRoute>
          },{
            path:"manage-contests",
            element:<PrivateRoute><ManageContests></ManageContests></PrivateRoute>
          },{
            path:"update-contest/:id",
            element:<PrivateRoute><UpdateContest></UpdateContest></PrivateRoute>,
            loader: ({params}) =>  fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`)
          },{
            path:"users",
            element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
          },{
            path:"manage-payments",
            element:<PrivateRoute><ManagePayment></ManagePayment></PrivateRoute>
          },{
            path:"contests-request",
            element:<PrivateRoute><ContestRequest></ContestRequest></PrivateRoute>
          },{
            path:"my-contest",
            element:<PrivateRoute><MyAddedContests></MyAddedContests></PrivateRoute>
          },{
            path:"submitted-contests",
            element:<PrivateRoute><SubmittedContests></SubmittedContests></PrivateRoute>
          }
        ]
      }
    ]
  },
]);
