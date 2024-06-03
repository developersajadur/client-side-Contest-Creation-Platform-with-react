import ChallengeCard from "../Challenges/ChallengeCard";
import useChallenge from "@/Hooks/useChallenge";

const HomeContests = () => {

    const [challenges] = useChallenge();

    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-10">Time to get challenge</h1>
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

export default HomeContests;
