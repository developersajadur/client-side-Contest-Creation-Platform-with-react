import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyAddedContests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const creatorEmail = user?.email;
    
    // Get contest by email
    const { refetch, data: myContestsData = [] } = useQuery({
      queryKey: ["myContests", creatorEmail],
      queryFn: async () => {
        if (!creatorEmail) return [];
        const { data } = await axiosSecure.get(`/my-contests/${creatorEmail}`);
        return data;
      },
      enabled: !!creatorEmail
    });
    // delete a contest
    const handleDelete = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/contests/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire("Deleted!", "Your Contest has been deleted.", "success");
                refetch();
            }
          }
        });
      };
    return (
        <div className="my-20">
        <Table>
        <TableHeader>
<TableRow>
 <TableHead className="">no.</TableHead>
 <TableHead className="">image</TableHead>
 <TableHead>Contest Name</TableHead>
 <TableHead>Price</TableHead>
 <TableHead className="text-left">DeadLine</TableHead>
 <TableHead className="text-left">Action</TableHead>
</TableRow>
</TableHeader>
{
myContestsData?.map((item, index) => 
<TableBody key={item._id}>
<TableRow>
 <TableCell className="font-medium">{index + 1}</TableCell>
 <TableCell className="font-medium"><img src={item?.image} alt="contest" className="h-10 w-10 rounded-full" /></TableCell>
 <TableCell>{item?.contestName}</TableCell>
 <TableCell>${item?.contestPrice}</TableCell>
 <TableCell className="text-left">{item?.contestDeadline}</TableCell>
 <TableCell className="text-right flex gap-5 items-center">
 <Link to={`/dashboard/update-contest/${item._id}`  || "/"} className="bg-red-600 p-2 rounded-[8px]"><FaPenFancy className="text-3xl text-[#FAFAFA]" /></Link>
 <button onClick={() => handleDelete(item?._id)} className="bg-red-600 p-2 rounded-[8px]"><AiFillDelete className="text-3xl text-[#FAFAFA]" /></button>
 </TableCell>
</TableRow>
</TableBody>
)
}   
</Table>
</div>
    );
};

export default MyAddedContests;