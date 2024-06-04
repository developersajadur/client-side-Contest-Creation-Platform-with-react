import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useChallenge = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const {refetch, data: challenges = []} = useQuery({
        queryKey: ["challenge"],
        queryFn: async () => {
            const {data} = await axiosPublic.get("/contests");
            return data;
        }
    }) 
    return [challenges, refetch]
};

export default useChallenge;