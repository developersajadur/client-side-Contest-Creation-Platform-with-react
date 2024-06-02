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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },{
          path:"/login",
          element:<Login></Login>
        },{
          path:"/register",
          element:<Register></Register>
        },{
          path:"/challenges",
          element:<Challenges></Challenges>
        },{
          path:"/add-contest",
          element:<AddContests></AddContests>
        },{
          path:"/details/:id",
          element:<ChallengeDetails></ChallengeDetails>,
          loader:({params}) => fetch(`${import.meta.env.VITE_API_URL}/contests/${params.id}`)
        }
    ]
  },
]);
