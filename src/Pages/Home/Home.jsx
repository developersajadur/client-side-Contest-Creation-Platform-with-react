import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Banner from "./Banner";
import HomeContests from "./HomeContests";

const Home = () => {
    const axiosSecure = useAxiosSecure();
    // axiosSecure.get("/contests")
    // .then(data => console.log(data.data))
    return (
        <div className="px-2 lg:px-10">
           <Banner></Banner>
           {/* <HomeContests></HomeContests> */}
        </div>
    );
};

export default Home;