/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface AddUserProps {
    refetch: () => Promise<any>; 
  }
const AddUser = ({refetch}: AddUserProps) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, control } = useForm();

  
    const [createUser] = useSignupMutation()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
           }
           const res = await createUser(userData)
           if(res?.data?.success) {
             toast.success("Created user successfully! 😍");
             reset()
             setOpen(false);
             refetch()
           }else{
             toast.error("Failed to create user. Please try again later. 🥲");
           }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="mb-2 mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
        >
          <span className=" relative z-10">Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className=" hover:text-[#FEA633]] font-semibold">
            Add Car
          </DialogTitle>
          <DialogDescription>Make changes to your car here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
          
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
            type="email"
            {...register("email")}
            className=" col-span-3"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Passowrd
            </Label>
            <Input
            type="password"
            {...register("password")}
            className=" col-span-3"></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Role
            </Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
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
              <span className=" relative z-10">Add User</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    );
};

export default AddUser;