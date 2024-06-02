import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ChallengeCard from "../Challenges/ChallengeCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const HomeContests = () => {
    const axiosPublic = useAxiosPublic();
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            const res = await axiosPublic.get("/contests");
            setChallenges(res.data);
        };

        fetchChallenges();
    }, [axiosPublic]);
    
    return (
        <div>
            <h1 className="text-3xl mt-10 lg:mt-0 lg:text-4xl font-bold text-center mb-10">Time to get challenge</h1>
            <div className="bg-[#FAFAFA] min-h-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
            {
                challenges.slice(0, 6).map(item => 
                    <ChallengeCard
                        key={item._id}
                        item={item}
                    ></ChallengeCard>
                )
            }
            </div>
            <div className="flex justify-center mt-5">
            <NavLink to="/challenges"><Button className="bg-[#3E54A3] hover:bg-[#3E54A3] text-white">Show More</Button></NavLink>
            </div>
        </div>
    );
};

export default HomeContests;
