import useAuth from "@/Hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const UserDashboard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const axiosSecure = useAxiosSecure();
      const axiosPublic = useAxiosPublic();
      const { user, updateUserProfile } = useAuth();
    
      const handleImageUpload = async (photo) => {
        const formData = new FormData();
        formData.append("image", photo[0]);
        return axiosPublic.post(imageHostingAPI, formData)
          .then(response => {
            const imageUrl = response.data.data.display_url;
            return imageUrl; // Return imageUrl from the .then() block
          })
          .catch(error => {
            console.error("Error uploading image:", error);
            throw error; // Rethrow the error to be caught by the caller
          });
    };
    
    const onSubmit = (data) => {
        handleImageUpload(data.photo)
          .then(imageUrl => {
            updateUserProfile(imageUrl, data.name );
            
            // Make an API call to update server-side user data
            axiosSecure.patch(`/users/${user?.email}`, { photo: imageUrl, name: data.name })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Your account has been updated',
                  showConfirmButton: false,
                  timer: 1500
                });
              })
          })
    };
    
    
    
      // Fetch user submission contests and points
      const { data: userSubmissionContests = [] } = useQuery({
        queryKey: ["userSubmission", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/submission/${user?.email}`);
          return data;
        },
        enabled: !!user?.email,
      });
    
      const { data: userPoints = { points: 0 } } = useQuery({
        queryKey: ["userPoint", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/user-points/${user?.email}`);
          return data;
        },
        enabled: !!user?.email,
      });

  return (
    <div className="py-20 flex gap-4">
      <div className="w-[40%]">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col justify-center">
            <img
              className="h-48 w-48 rounded-full"
              src={user?.photoURL}
              alt="User profile"
            />
            <div className="-mt-5 ml-11">
              <Dialog>
                <DialogTrigger className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end rounded-xl">
                  Edit Profile
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Edit Your Profile Details</DialogTitle>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <label htmlFor="name">Name</label>
                          <input
                            id="name"
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                              errors.name ? "border-red-500" : ""
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-6">
                          <label htmlFor="photo">Profile Photo</label>
                          <input
                            id="photo"
                            type="file"
                            {...register("photo", {
                              required: "Profile photo is required",
                            })}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                              errors.photo ? "border-red-500" : ""
                            }`}
                          />
                          {errors.photo && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.photo.message}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            className="bg-[#3E54A3] hover:bg-[#3E54A3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{user?.displayName}</h1>
            <p className="text-lg mt-2 font-medium">{user?.email}</p>
            <h1 className="text-5xl mt-4 font-semibold">
              {userPoints?.points} <span className="text-lg">Points</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="w-[60%] flex flex-col text-3xl font-semibold items-center">
        My Submissions
        <div className="my-20 overflow-y-scroll h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Contest Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSubmissionContests.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item?.contestName}</TableCell>
                  <TableCell>${item?.contestPrice}</TableCell>
                  <TableCell>
                    {new Date(item.submissionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {item.isWinner ? (
                      <span className="text-green-500">Winner</span>
                    ) : (
                      <span className="text-red-500">Loser</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end rounded-xl">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white p-4 rounded-md shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            Important Link:{" "}
                            <a
                              target="_blank"
                              href={`${item?.importantLink}`}
                              className="text-blue-600 underline"
                            >
                              {item?.importantLink}
                            </a>
                          </DialogTitle>
                          <DialogDescription className="overflow-y-scroll h-60 mt-2">
                            {item?.submissionDescription}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
