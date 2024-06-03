import useChallenge from "@/Hooks/useChallenge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { AiFillDelete } from "react-icons/ai";
import { FaPenFancy } from "react-icons/fa";
  

const ManageContests = () => {
    const [challenges] = useChallenge();
    // const { contestName, image, contestDescription, contestPrice, prizeMoney, taskSubmissionInstructions, contestTags, contestDeadline }
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
        challenges.map((item, index) => 
            <TableBody key={item._id}>
              <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium"><img src={item?.image} alt="contest" className="h-10 w-10 rounded-full" /></TableCell>
                <TableCell>{item?.contestName}</TableCell>
                <TableCell>${item?.contestPrice}</TableCell>
                <TableCell className="text-left">{item?.contestDeadline}</TableCell>
                <TableCell className="text-right flex gap-5 items-center">
                <button className="bg-red-600 p-2 rounded-[8px]"><FaPenFancy className="text-3xl text-[#FAFAFA]" /></button>
                <button className="bg-red-600 p-2 rounded-[8px]"><AiFillDelete className="text-3xl text-[#FAFAFA]" /></button>
                </TableCell>
              </TableRow>
            </TableBody>
        )
       }   
       </Table>
        </div>
    );
};

export default ManageContests;