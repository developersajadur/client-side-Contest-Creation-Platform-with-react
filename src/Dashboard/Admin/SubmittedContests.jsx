import useAxiosSecure from "@/Hooks/useAxiosSecure";
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

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

const SubmittedContests = () => {
  const axiosSecure = useAxiosSecure();
  const [submittedContests, setSubmittedContests] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);

  const { data: submissionContests = [], refetch } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests");
      return data;
    },
  });

  const handleSeeSubmits = async (contestId) => {
    const { data } = await axiosSecure.get(`/submission-contest/${contestId}`);
    setSubmittedContests(data);
  };

  const handleWinner = async (id) => {
    try {
      const response = await axiosSecure.patch(`/make-winner/${id}`);
      if (response.data.modifiedCount > 0) {
        toast.success("Winner marked successfully");
        setSelectedWinner(id);
        refetch();
      } else {
        toast.error("Failed to mark winner");
      }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to mark winner");
    }
  };

  return (
    <div className="my-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">no.</TableHead>
            <TableHead className="text-left">Contest Name</TableHead>
            <TableHead className="text-left">Contest Price</TableHead>
            <TableHead className="text-left">Deadline</TableHead>
            <TableHead className="text-left">Submission</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissionContests.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="text-left">{item?.contestName}</TableCell>
              <TableCell className="text-left">${item?.contestPrice}</TableCell>
              <TableCell className="text-left">
                {item?.contestDeadline}
              </TableCell>
              <TableCell className="text-left">
                <Dialog>
                  <DialogTrigger
                    onClick={() => handleSeeSubmits(item._id)}
                    className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl"
                  >
                    See
                  </DialogTrigger>
                  <DialogContent className="bg-white py-12">
                    <DialogHeader>
                      <DialogTitle>Submitted Users</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-scroll max-h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="">no.</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {submittedContests?.map((submission, index) => (
                            <TableRow key={submission._id}>
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>{submission?.userEmail}</TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end rounded-xl">Details</DialogTrigger>
                                  <DialogContent className="bg-white">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Importance Link: <a target="_blank" href={`${submission?.importantLink}`} >
                                          {submission?.importantLink}
                                        </a>
                                      </DialogTitle>
                                      <DialogDescription className="overflow-y-scroll h-60"> 
                                        {submission?.submissionDescription}
                                      </DialogDescription>
                                      <div className="flex justify-end">
                                        {selectedWinner === submission._id ? (
                                          <p className="text-red-500">Winner</p>
                                        ) : (
                                          <Button onClick={() => handleWinner(submission?._id)} className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-4 rounded-xl">Make Winner</Button>
                                        )}
                                      </div>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmittedContests;
