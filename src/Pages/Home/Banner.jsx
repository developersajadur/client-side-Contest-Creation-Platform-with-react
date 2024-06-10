import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import ChallengeCard from "../Challenges/ChallengeCard";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const [contests, setContests] = useState([]);
  const [defaultContest, setDefaultContest] = useState(null);
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  // Fetch and set default contest card(s)
  useEffect(() => {
    const fetchDefaultContest = async () => {
      axiosPublic.get("/contests")
        .then(response => setDefaultContest(response.data))
        .catch(error => setError("Error fetching default contest: " + error.message));
    };

    fetchDefaultContest();
  }, [axiosPublic]);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();

    const lowercaseTags = tags.toLowerCase();
    axiosPublic.get("/contests", { params: { tags: lowercaseTags } })
      .then(response => {
        setContests(response.data);
        setError(""); // Clear any previous errors
      })
      .catch(error => {
        setError("Error searching contests: " + error.message); 
        setContests([]);
      });
  };

  return (
    <div className="">
    <div className="">
    <div className="w-full flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center gap-10">
      <div className="items-center">
        <h1 className="text-4xl lg:text-5xl font-semibold text-[#3E54A3]">Take a Challenge</h1>
        <p className="text-lg mt-5">
          Get A Challenge offers curated challenges to enhance skills, boost fitness, and spark creativity. Join our community, track progress, and achieve personal growth while earning rewards.
        </p>

        <form onSubmit={handleSearch} className="flex w-full mt-5 max-w-sm items-center space-x-2">
          <Input
            type="text"
            name="tags"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Button className="bg-[#3E54A3] hover:bg-[#3E54A3] text-white">
            Search
          </Button>
        </form>

        {/* Error handling */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <img className="w-full md:1/2 lg:w-[45%]" src="/image/learning-paths-hero.png" alt="Banner" />
    </div>
    </div>
    {contests.length === 0 ? (
          defaultContest && (
            <div>
            <h1 className="text-3xl mt-10 lg:mt-0 lg:text-4xl font-bold text-center mb-10">Time to get challenge</h1>
            <div className="bg-[#FAFAFA] min-h-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
            {
                defaultContest.slice(0, 6).map(item => 
                    <ChallengeCard
                        key={item._id}
                        item={item}
                    ></ChallengeCard>
                )
            }
            </div>
            <div className="flex justify-center mt-5">
            <NavLink to="/challenges"><Button className="bg-[#3E54A3] hover:bg-[#3E54A3] text-white">Show All</Button></NavLink>
            </div>
        </div>
          )
        ) : (
          <div>
          <h1 className="text-3xl mt-10 lg:mt-0 lg:text-4xl font-bold text-center mb-10">Time to get challenge</h1>
          <div className="bg-[#FAFAFA] min-h-min grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
          {
              contests.map(item => 
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
        )}
    </div>
  );
};

export default Banner;
