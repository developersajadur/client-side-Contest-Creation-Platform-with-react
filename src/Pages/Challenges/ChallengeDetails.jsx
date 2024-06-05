import { Link, useLoaderData } from "react-router-dom";
import cardBgImage from "../../../public/image/card-bg-img.jpeg";
import { MdPaid } from "react-icons/md";
// import { Button } from "@/components/ui/button";

const ChallengeDetails = () => {
    const contest = useLoaderData();
    const { contestName, image, contestDescription, contestPrice, prizeMoney, taskSubmissionInstructions, contestTags, contestDeadline } = contest;

    return (
        <div className="lg:mx-20 lg:my-10">
            <div className="p-5 border rounded-xl flex gap-10">
                <div className="w-full lg:w-1/2">
                    {contestTags && contestTags.length > 0 && (
                        <div className="flex flex-col lg:flex-row mt-5 gap-5">
                            {contestTags.map((tag, index) => (
                                <h5 key={index} className="text-2xl font-semibold" style={{ color: index === 0 ? '#6ABECD' : '#3E54A3' }}>
                                    {tag}
                                </h5>
                            ))}
                        </div>
                    )}
                    <h1 className="text-4xl font-semibold mt-5">{contestName}</h1>
                    <p className="text-lg mt-5">{contestDescription}</p>
                    <p className="text-lg mt-5"><span className="font-bold">You need to submit: </span>{taskSubmissionInstructions}</p>
                    <div className="bg-[#F0F4F4] p-5 rounded-xl mt-7">
                        <div className="flex gap-5 items-center justify-start">
                            <MdPaid className="text-6xl" />
                            <p className="text-lg font-semibold">This is a premium challenge. You'll need to pay ${contestPrice} to start this challenge.</p>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/stripe-payment" className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">Pay Now</Link>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundImage: `url(${cardBgImage})` }} className="w-full rounded-xl h-fit lg:w-1/2 p-6">
                    <img className="w-full rounded-xl" src={image} alt="contest" />
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetails;
