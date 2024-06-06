import useAxiosSecure from "@/Hooks/useAxiosSecure";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const ManagePayment = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: payments = [] } = useQuery({
        queryKey: ["payment"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/payment");
            return data;
        }
    });

    return (
        <div className="my-20">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">no.</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead className="text-left">Transaction Id</TableHead>
                        <TableHead className="text-left">Amount</TableHead>
                        <TableHead className="text-left">Date</TableHead>
                    </TableRow>
                </TableHeader>
                {payments.map((item, index) => (
                    <TableBody key={item._id}>
                        <TableRow>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{item?.name}</TableCell>
                            <TableCell>{item?.email}</TableCell>
                            <TableCell className="text-left">{item?.transactionId}</TableCell>
                            <TableCell className="text-left">${item?.amount}</TableCell>
                            <TableCell className="text-left">
                                {format(new Date(item?.date), "yyyy-MM-dd")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </div>
    );
};

export default ManagePayment;
