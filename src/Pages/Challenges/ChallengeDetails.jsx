import { useLoaderData } from "react-router-dom";
import cardBgImage from "../../../public/image/card-bg-img.jpeg";
import { MdPaid } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "@/Payments/StripePayment/StripePaymentForm";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useTimer } from "react-timer-hook";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ChallengeDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get contest details
  const contest = useLoaderData();

  // Destructure contest only after ensuring it's loaded
  const {
    contestName,
    image,
    contestDescription,
    contestPrice,
    prizeMoney,
    taskSubmissionInstructions,
    contestTags,
    contestDeadline,
    _id,
  } = contest || {};

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(contestDeadline).getTime(),
    onExpire: () => console.warn("Timer expired!"),
  });

  // Fetch payment data for the user
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axiosSecure.get(`/payment/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Check if the user has already paid for this contest
  const hasPaid = payments.some((payment) => payment.contestId === _id);

  // Fetch submission data for the user and contest
  const { data: submission, refetch } = useQuery({
    queryKey: ["submission", user?.email, _id],
    queryFn: async () => {
      if (!user?.email || !_id) return null;
      const { data } = await axiosSecure.get(
        `/submission/${user?.email}/${_id}`
      );
      return data;
    },
    enabled: !!user?.email && !!_id,
  });

  const onSubmit = (data) => {
    const dataToSend = {
      contestName: contestName,
      contestId: _id,
      userName: user?.displayName,
      userEmail: user?.email,
      importantLink: data?.importantLink,
      submissionDescription: data?.submissionDescription,
      submissionDate: new Date(),
    };
    axiosSecure.post("/submission", dataToSend).then((res) => {
      if (res.data.insertedId) {
        reset();
        refetch();
        toast.success("Submission added successfully");
      }
    });
  };

  if (!contest) {
    return <div>Loading...</div>;
  }

  // Check if the current date is after the contest deadline
  const isContestOver =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="lg:mx-20 lg:my-10">
      <div className="p-5 border rounded-xl flex gap-10">
        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-between">
            {contestTags && contestTags.length > 0 && (
              <div className="flex flex-col lg:flex-row mt-5 gap-5">
                {contestTags.map((tag, index) => (
                  <h5
                    key={index}
                    className="text-2xl font-semibold"
                    style={{ color: index === 0 ? "#6ABECD" : "#3E54A3" }}
                  >
                    {tag}
                  </h5>
                ))}
              </div>
            )}

            <div className="flex items-center mt-5 justify-end">
              <p className="text-xl font-semibold">
                Death Line: {days}d {hours}h {minutes}m {seconds}s
              </p>
            </div>
          </div>
          <h1 className="text-4xl font-semibold mt-5">{contestName}</h1>
          <p className="text-lg mt-5">{contestDescription}</p>
          <p className="text-lg mt-5">
            <span className="font-bold">You need to submit: </span>
            {taskSubmissionInstructions}
          </p>
          <div className="bg-[#F0F4F4] p-5 rounded-xl mt-7">
            <div className="flex gap-5 items-center justify-start">
              <MdPaid className="text-6xl" />
              <p className="text-lg font-semibold">
                This is a premium challenge. You'll need to pay ${contestPrice}{" "}
                to start this challenge.
              </p>
            </div>
            <div className="flex justify-end">
              {isContestOver ? (
                <p className="text-lg text-red-500">Sorry, the contest No More.</p>
              ) : hasPaid ? (
                submission ? (
                  <h1 className="text-green-500 font-semibold mt-2">
                    <Dialog>
                      <DialogTrigger className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">
                        See Your Result
                      </DialogTrigger>
                      <DialogContent className="bg-white py-16">
                        <DialogHeader>
                          <DialogTitle>You Got 100%</DialogTitle>
                          <DialogDescription>
                            And You Get 10000$ for your performance
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </h1>
                ) : (
                  <Dialog>
                    <DialogTrigger className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">
                      Submit Now
                    </DialogTrigger>
                    <DialogContent className="bg-white py-16">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <label
                            htmlFor="importantLink"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Important Link
                          </label>
                          <Input
                            id="importantLink"
                            type="text"
                            placeholder="You can write here github, img link and others"
                            {...register("importantLink", {
                              required: "Important Link is required",
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              errors.importantLink ? "border-red-500" : ""
                            }`}
                          />
                          {errors.importantLink && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.importantLink.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="submissionDescription"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Describe Some
                          </label>
                          <Textarea
                            id="submissionDescription"
                            type="text"
                            placeholder="Time to describe your challenge"
                            {...register("submissionDescription", {
                              required: "Description is required",
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              errors.submissionDescription
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          {errors.submissionDescription && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.submissionDescription.message}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )
              ) : (
                <Dialog>
                  <DialogTrigger className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">
                    Pay Now
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        contestId={_id}
                        contestName={contestName}
                        contestPrice={contestPrice}
                      />
                    </Elements>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${cardBgImage})` }}
          className="w-full rounded-xl h-fit lg:w-1/2 p-6"
        >
          <img className="w-full rounded-xl" src={image} alt="contest" />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
