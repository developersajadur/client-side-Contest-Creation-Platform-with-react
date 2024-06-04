import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Swal from "sweetalert2";
  
const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: users = []} = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const {data} = await axiosSecure.get("/users");
            return data;
        }
    })

    const handleAdmin = (id) => {
        axiosSecure.patch(`/users/admin/${id}`,{
            role: "admin",
          })
          .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                  title: "Updated!",
                  text: "User has been updated.",
                  icon: "success",
                });
            }
            refetch();
          })
         .catch((err) => {
            console.log(err);
          });
    }
    const handleCreator = (id) => {
        axiosSecure.patch(`/users/creator/${id}`,{
            role: "creator",
          })
          .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                  title: "Updated!",
                  text: "User has been updated.",
                  icon: "success",
                });
            }
            refetch();
          })
         .catch((err) => {
            console.log(err);
          });
    }
    const handleUser = (id) => {
        {
            axiosSecure.patch(`/users/user/${id}`,{
                role: "user",
              })
              .then(res => {
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                      title: "Updated!",
                      text: "User has been updated.",
                      icon: "success",
                    });
                }
                refetch();
              })
             .catch((err) => {
                console.log(err);
              });
        }
    }
    return (
        <div className="my-20">
        <Table>
        <TableHeader>
<TableRow>
 <TableHead className="">no.</TableHead>
 <TableHead className="">image</TableHead>
 <TableHead>User Name</TableHead>
 <TableHead>email</TableHead>
 <TableHead className="text-left">Role</TableHead>
 <TableHead className="text-left">Action</TableHead>
</TableRow>
</TableHeader>
{
users.map((item, index) => 
<TableBody key={item._id}>
<TableRow>
 <TableCell className="font-medium">{index + 1}</TableCell>
 <TableCell className="font-medium"><img src={item?.photo} alt="contest" className="h-10 w-10 rounded-full" /></TableCell>
 <TableCell>{item?.name}</TableCell>
 <TableCell>{item?.email}</TableCell>
 <TableCell className="text-left">{item?.role}</TableCell>
 <TableCell className="text-right flex gap-5 items-center">
 <Select >
  <SelectTrigger className="w-36 ">
    <SelectValue  placeholder={item?.role} />
  </SelectTrigger>
  <SelectContent className=" bg-white">

        <option className="cursor-pointer mb-1" onClick={() => handleAdmin(item?._id)}>Admin</option>
        <option className="cursor-pointer mb-1" onClick={() => handleCreator(item?._id)} >Contest Creator</option>
        <option className="cursor-pointer" onClick={() => handleUser(item?._id)}>User</option>

  </SelectContent>
</Select>

 </TableCell>
</TableRow>
</TableBody>
)
}   
</Table>
</div>
    );
};

export default ManageUsers;