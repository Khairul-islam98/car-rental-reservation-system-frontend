import { Badge } from "@/components/ui/badge";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface DeleteUserProps {
  id: string;
}

const DeleteUser = ({ id }: DeleteUserProps) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (userId: string) => {
    if (!userId) {
      toast.error("User ID is undefined. Cannot delete user.");
      return;
    }


    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteUser(userId).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your User has been deleted.",
            icon: "success",
          });
        } else {
          toast.error("Failed to delete User");
        }
      } catch (err) {
        toast.error("Failed to delete User");
      }
    }
  };

  return (
    <div>
      <Badge onClick={() => handleDelete(id)} variant="destructive">
        remove
      </Badge>
    </div>
  );
};

export default DeleteUser;
