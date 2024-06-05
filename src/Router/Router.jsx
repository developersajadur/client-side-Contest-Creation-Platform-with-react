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
import StripePayment from "@/Payments/StripePayment/StripePayment";

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
      },
      {
        path:"/register",
        element:<Register></Register>
      },{
        path:"/stripe-payment",
        element:<StripePayment></StripePayment>,
      },
      {
        path:"/challenges",
        element:<Challenges></Challenges>
      },
      {
        path:"/contest/:contestName",
        element:<ChallengeDetails></ChallengeDetails>,
        loader: ({ params }) => {
          const contestName = params.contestName.replace(/-/g, ' ');
          return fetch(`${import.meta.env.VITE_API_URL}/contests/${contestName}`);
        }
      },{
        path:"/dashboard",
        element:<DashBoard></DashBoard>,
        children:[
          {
            path:"add-contest",
            element:<AddContests></AddContests>
          },{
            path:"manage-contests",
            element:<ManageContests></ManageContests>
          },{
            path:"update-contest/:id",
            element:<UpdateContest></UpdateContest>,
            loader: ({params}) =>  fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`)
          },{
            path:"users",
            element:<ManageUsers></ManageUsers>
          }
        ]
      }
    ]
  },
]);
