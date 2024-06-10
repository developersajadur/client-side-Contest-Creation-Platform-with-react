import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const LeaderBoard = () => {
    const axiosPublic = useAxiosPublic()
    // Fetch payment data for the user
    const { data: payments = [] } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
          const { data } = await axiosPublic.get(`/payment/${user?.email}`);
          return data;
        },
        enabled: !!user?.email,
      });
    return (
        <div className="mt-10">
            <h1 className="text-4xl font-semibold text-center">Our Memorable Users</h1>

            <div className="bg-[#FAFAFA] min-h-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">

            </div>
        </div>
    );
};

export default LeaderBoard;