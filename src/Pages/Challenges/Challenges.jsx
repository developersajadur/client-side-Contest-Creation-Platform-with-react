import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";

const Challenges = () => {
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
        <div className="">
                        <h1 className="text-4xl font-bold text-center my-10">Let's Take A Risk</h1>
        <div className="bg-[#FAFAFA] min-h-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
            {
                challenges.map(item => 
                    <ChallengeCard
                    key={item._id}
                    item={item}
                    ></ChallengeCard>

                )
            }
        </div>
        </div>
    );
};

export default Challenges;
