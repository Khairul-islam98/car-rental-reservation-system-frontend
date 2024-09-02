/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetUpdateUserMutation } from "@/redux/features/user/userApi";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


interface UpdateModalProps {
  user: any;
}

const UpdateModal = ({ user,}: UpdateModalProps) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, control } = useForm();
    const [updateUser] = useGetUpdateUserMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        
        const userData = {
            id: user._id,
          name: data.name,
          status: data.status,
          role: data.role,
        };
        

        try {
          const res = await updateUser(userData).unwrap();
          if (res?.success) {
            toast.success("Update user successfully!");
            reset();
            setOpen(false);
          }
        } catch (error) {
          toast.error("Failed to update user.");
        }
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Badge
        onClick={() => setOpen(true)}
        variant={'outline'}
       className=" cursor-pointer"
      >
        Edit
      </Badge>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
      <DialogHeader>
        <DialogTitle className=" hover:text-[#FEA633]] font-semibold">
          Edit User
        </DialogTitle>
        <DialogDescription>Make changes to your user here.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input {...register("name")} id="name" defaultValue={user.name} className="col-span-3" />
        
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Status
          </Label>
          <Controller
            name="status"
            defaultValue={user.status}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"active"}>Active</SelectItem>
                    <SelectItem value={"block"}>Block</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Role
          </Label>
          <Controller
            name="role"
            defaultValue={user.role}
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                  <SelectValue placeholder="Select a option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"user"}>User</SelectItem>
                    <SelectItem value={"admin"}>Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        
        <DialogFooter>
          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
          >
            <span className=" relative z-10">Edit User</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  );
};

export default UpdateModal;
