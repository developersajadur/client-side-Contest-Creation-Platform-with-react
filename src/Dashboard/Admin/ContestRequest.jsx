import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import { format } from "date-fns";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { FaComment } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const ContestRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const { refetch, data: contestsStatusData = [] } = useQuery({
    queryKey: ["contestStatus"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/pending-rejected-contests");
      return data;
    },
  });

  const handleApprove = async (id) => {
    axiosSecure
      .patch(`/approve-contests/${id}`, {
        status: "approved",
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Contest has been updated.",
            icon: "success",
          });
          refetch();
        }
      });
  };
  const handleReject = async (id) => {
    axiosSecure
      .patch(`/rejected-contests/${id}`, {
        status: "rejected",
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Contest has been updated.",
            icon: "success",
          });
          refetch();
        }
      });
  };

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div className="my-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">no.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Contest Name</TableHead>
            {/* <TableHead className="text-left">User Name</TableHead>
                    <TableHead className="text-left">User Email</TableHead> */}
            <TableHead className="text-left">User Email</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        {contestsStatusData.map((item, index) => (
          <TableBody key={item._id}>
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <img
                  src={item?.image}
                  alt="contest"
                  className="h-10 w-10 rounded-full"
                />
              </TableCell>
              <TableCell>{item?.contestName}</TableCell>
              <TableCell className="text-left">{item?.userEmail}</TableCell>
              <TableCell className="text-left ">
                <div className="flex gap-2 items-center">
                  {item?.status}
                  <Dialog>
                    <DialogTrigger>
                      <FaComment className="text-xl" />
                    </DialogTrigger>
                    <DialogContent  className="bg-white py-12">
                      <DialogHeader>
                        <DialogTitle>Sent A Comment For Contest Creator</DialogTitle>
                       <form onSubmit={handleSubmit(onSubmit)}>
                       <Textarea  {...register('comment', { required: true })} placeholder="Write A Comment" />
                        {errors.comment && <span className="text-red-500">Comment Is required</span>}
                      <div className="flex justify-end">
                      <Button className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] w-fit text-white mt-2 rounded-xl">Send</Button>
                      </div>
                       </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
              <TableCell className="text-right flex gap-5 items-center">
                <Select>
                  <SelectTrigger className="w-36 ">
                    <SelectValue placeholder={item?.status} />
                  </SelectTrigger>
                  <SelectContent className=" bg-white">
                    <option
                      className="cursor-pointer mb-1"
                      onClick={() => handleApprove(item?._id)}
                    >
                      Approve
                    </option>
                    <option
                      className="cursor-pointer mb-1"
                      onClick={() => handleReject(item?._id)}
                    >
                      Reject
                    </option>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ContestRequest;
