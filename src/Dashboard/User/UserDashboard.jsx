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
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";

const UserDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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
                        <img className="h-48 w-48 rounded-full" src={user?.photoURL} alt="User profile" />
                        <div className="-mt-5 ml-11">
                            <Button className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end mt-2 rounded-xl">
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold">{user?.displayName}</h1>
                        <p className="text-lg mt-2 font-medium">{user?.email}</p>
                        <h1 className="text-5xl mt-4 font-semibold">{userPoints?.points} <span className="text-lg">Points</span></h1>
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
                                    <TableCell>{new Date(item.submissionDate).toLocaleDateString()}</TableCell>
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
                                                <Button className="bg-[#3E54A3] p-3 hover:bg-[#3E54A3] text-white justify-end rounded-xl">Details</Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white p-4 rounded-md shadow-lg">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-semibold">
                                                        Important Link: <a target="_blank" href={`${item?.importantLink}`} className="text-blue-600 underline">
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
