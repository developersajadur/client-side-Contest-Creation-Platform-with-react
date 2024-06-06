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
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Swal from "sweetalert2";

const ContestRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: contestsStatusData = [] } = useQuery({
        queryKey: ["contestStatus"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/pending-rejected-contests");
            return data;
        }
    });

    const handleApprove = async (id) => {
        axiosSecure.patch(`/approve-contests/${id}`, {
            status: "approved"
        })
       .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Updated!",
                    text: "Contest has been updated.",
                    icon: "success",
                });
                refetch();
            }
        })
    }
    const handleReject = async (id) => {
        axiosSecure.patch(`/rejected-contests/${id}`, {
            status: "rejected"
        })
       .then(res => {
        if(res.data.modifiedCount > 0){
            Swal.fire({
                title: "Updated!",
                text: "Contest has been updated.",
                icon: "success",
            });
            refetch();
        }
 
       })
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
                        <TableCell className="font-medium"><img src={item?.image} alt="contest" className="h-10 w-10 rounded-full" /></TableCell>
                        <TableCell>{item?.contestName}</TableCell>
                        {/* <TableCell className="text-left">{item?.userName}</TableCell>
                        <TableCell className="text-left">{item?.userEmail}</TableCell> */}
                        <TableCell className="text-left">{item?.userEmail}</TableCell>
                        {/* <TableCell className="text-left">
                            {format(new Date(item?.date), "yyyy-MM-dd")}
                        </TableCell> */}
                        <TableCell className="text-left">{item?.status}</TableCell>
                        <TableCell className="text-right flex gap-5 items-center">
 <Select >
  <SelectTrigger className="w-36 ">
    <SelectValue  placeholder={item?.status} />
  </SelectTrigger>
  <SelectContent className=" bg-white">

        <option className="cursor-pointer mb-1" onClick={() => handleApprove(item?._id)}>Approve</option>
        <option className="cursor-pointer mb-1" onClick={() => handleReject(item?._id)} >Reject</option>

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