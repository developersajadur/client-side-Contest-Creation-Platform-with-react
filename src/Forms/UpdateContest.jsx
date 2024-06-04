import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { toast } from 'react-hot-toast';
import { useLoaderData } from "react-router-dom";
import { ImageMinus } from "lucide-react";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UpdateContest = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [selectedDate, setSelectedDate] = useState(null);
    const [image, setImage] = useState(null);
    const contest = useLoaderData();
    const { contestName, contestDescription, contestPrice, prizeMoney, taskSubmissionInstructions, contestTags, contestDeadline } = contest;
    // console.log(contest.contestName);



    const onSubmit = async (data) => {
        let imageUrl = data.image;

        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            const res = await axiosPublic.post(imageHostingApi, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                imageUrl = res.data.data.display_url;
            } else {
                toast.error("Failed to upload image");
                return;
            }
        }

        const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
        const contestData = {
            contestName: data.contestName,
            image: imageUrl,
            contestDescription: data.contestDescription,
            contestPrice: data.contestPrice,
            prizeMoney: data.prizeMoney,
            taskSubmissionInstructions: data.taskSubmissionInstructions,
            contestTags: data.contestTags.split(',').map(tag => tag.trim()),
            contestDeadline: formattedDate,
        };

        const contestRes = await axiosSecure.put(`/contests/${contest?._id}`, contestData);
        if (contestRes.data.modifiedCount > 0) {
            toast.success("Contest updated successfully");
            reset();
            setSelectedDate(null);
            setImage(null);
        } else {
            toast.error("Failed to update contest");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-20 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Update Contest</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Contest Name</label>
                <input
                defaultValue={contestName}
                    type="text"
                    {...register('contestName', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.contestName && <span className="text-red-500">Contest Name is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                defaultValue={contestDescription}
                    {...register('contestDescription', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.contestDescription && <span className="text-red-500">Description is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                defaultValue={contestPrice}
                    type="text"
                    {...register('contestPrice', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.contestPrice && <span className="text-red-500">Price is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Prize Money</label>
                <input
                defaultValue={prizeMoney}
                    type="text"
                    {...register('prizeMoney', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.prizeMoney && <span className="text-red-500">Prize Money is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Task Submission Instructions</label>
                <textarea
                defaultValue={taskSubmissionInstructions}
                    {...register('taskSubmissionInstructions', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.taskSubmissionInstructions && <span className="text-red-500">Instructions are required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Tags</label>
                <input
                defaultValue={contestTags}
                    type="text"
                    {...register('contestTags', { required: true })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Separate tags with commas"
                />
                {errors.contestTags && <span className="text-red-500">Tags are required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Contest Deadline</label>
                <Controller
                    name="contestDeadline"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                field.onChange(date);
                            }}
                            className="w-full px-3 py-2 border rounded"
                        />
                    )}
                />
                {errors.contestDeadline && <span className="text-red-500">Deadline is required</span>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Update Contest</button>
        </form>
    );
};

export default UpdateContest;
