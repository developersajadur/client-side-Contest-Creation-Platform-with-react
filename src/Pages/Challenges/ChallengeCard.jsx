import cardBgImage from "../../../public/image/card-bg-img.jpeg";

const ChallengeCard = ({item}) => {
    const description = item?.contestDescription
    const shortDescription = description.length > 80 ? description.slice(0, 60) + "..." : description;

    return (
        <div className="w-full lg:w-96 flex flex-col rounded-xl border bg-cover bg-center">
            <div style={{ backgroundImage: `url(${cardBgImage})` }} className="p-4 relative rounded-lg">
                <div className="bg-[#E7EBF9] right-5 top-5 px-3 py-1 font-bold rounded-full absolute">FREE</div>
                <img
                    src={item?.image}
                    alt="Challenge"
                    className="rounded-lg h-64 w-full"
                />
            </div>
            <div className="p-4">
                <h1 className="text-3xl font-semibold">{item?.contestName}</h1>
                <div className="flex flex-col lg:flex-row mt-5 gap-5">
                    <h5 className="text-[#6ABECD] text-2xl font-semibold">{item?.contestTags[0]}</h5>
                    <h5 className="text-[#3E54A3] text-2xl font-semibold">{item?.contestTags[1]}</h5>
                </div>
                <p className="text-lg mt-5">
                    {shortDescription}
                </p>
            </div>
        </div>
    );
};

export default ChallengeCard;
