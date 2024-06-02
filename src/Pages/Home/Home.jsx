import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Banner from "./Banner";

const Home = () => {
    const axiosSecure = useAxiosSecure();
    // axiosSecure.get("/contests")
    // .then(data => console.log(data.data))
    return (
        <div className="px-2 lg:px-10">
           <Banner></Banner>
        </div>
    );
};

export default Home;