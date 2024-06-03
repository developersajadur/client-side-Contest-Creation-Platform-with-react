import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useChallenge = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const {data: challenges = []} = useQuery({
        queryKey: ["challenge"],
        queryFn: async () => {
            const {data} = await axiosPublic.get("/contests");
            return data;
        }
    }) 
    return [challenges]
};

export default useChallenge;