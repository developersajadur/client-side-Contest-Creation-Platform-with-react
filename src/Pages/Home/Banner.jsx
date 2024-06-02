import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Banner = () => {
  const { register, handleSubmit } = useForm();

  const handleSearch = (data) => {
    console.log(data.searchQuery);
  };

  return (
    <div className="w-full flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center gap-10">
      <div className="items-center">
        <h1 className="text-4xl lg:text-5xl font-semibold text-[#3E54A3]">get a challenge</h1>
        <p className="text-lg mt-5">
          Get A challenge, offers curated challenges to enhance skills, boost fitness, and spark creativity. Join our community, track progress, and achieve personal growth while earning rewards.
        </p>

        <form onSubmit={handleSubmit(handleSearch)} className="flex w-full mt-5 max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search A Challenge"
            {...register("searchQuery", { required: true })}
          />
          <Button className="bg-[#3E54A3] hover:bg-[#3E54A3] text-white" type="submit">
            Search
          </Button>
        </form>
      </div>
      <img className="w-full md:1/2 lg:w-[45%]" src="/image/learning-paths-hero.png" />
    </div>
  );
};

export default Banner;
