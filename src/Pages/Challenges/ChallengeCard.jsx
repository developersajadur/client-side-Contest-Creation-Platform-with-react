import cardBgImage from "../../../public/image/card-bg-img.jpeg";

const ChallengeCard = () => {
    const description = "CSS Battle challenges participants to recreate a given design using only HTML and CSS. It's a fun way to improve CSS skills and creativity.";
    const shortDescription = description.length > 80 ? description.slice(0, 60) + "..." : description;

    return (
        <div className="w-96 flex flex-col rounded-xl border bg-cover bg-center">
            <div style={{ backgroundImage: `url(${cardBgImage})` }} className="p-4 relative">
                <div className="bg-[#E7EBF9] right-5 top-5 px-3 py-1 font-bold rounded-full absolute">FREE</div>
                <img
                    src="https://www.frontendmentor.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdz209s6jk%2Fimage%2Fupload%2Fv1709635029%2FLearningPaths%2Fsvxn9hckf62ieldx5lqz.jpg&w=1920&q=75"
                    alt="Challenge"
                    className="rounded-lg"
                />
            </div>
            <div className="p-4">
                <h1 className="text-3xl font-semibold">CSS Battle</h1>
                <div className="flex mt-5 gap-5">
                    <h5 className="text-[#6ABECD] text-2xl font-semibold">CSS Battle</h5>
                    <h5 className="text-[#3E54A3] text-2xl font-semibold">Web Development</h5>
                </div>
                <p className="text-lg mt-5">
                    {shortDescription}
                </p>
            </div>
        </div>
    );
};

export default ChallengeCard;
