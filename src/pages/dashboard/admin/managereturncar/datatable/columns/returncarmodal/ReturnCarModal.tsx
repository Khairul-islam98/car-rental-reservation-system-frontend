/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBookingModalProps } from "@/components/CarModal";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useReturnCarMutation } from "@/redux/features/cars/carApi";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ReturnCarModal = ({
  type,
  booking,
  children,
}: {
  type: string;
  booking: IBookingModalProps;
  user: string;
  children: React.ReactNode;

}) => {
  const [open, setOpen] = useState(false);
  const [returnTime, setReturnTime] = useState("");


  const [returnCar] = useReturnCarMutation();
  const { refetch, isLoading } = useGetAllBookingsQuery(undefined);
  const { register, handleSubmit, reset} = useForm();
  


  const handleConfirm: SubmitHandler<FieldValues> = async (data) => {

    const bookingData = {
        bookingId: booking._id,
        endTime: data.endTime,
        user: booking.user._id,
        car: booking.car._id,
    }
    try {
      const res = await returnCar(bookingData).unwrap();
      console.log(res ,"res");
      toast.success("Car returned successfully!");
      refetch()
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to return car:");
    }
  };


  if (booking?.payment === "pending") {
    return (
      <div className="text-center">
        <p className="text-red-500">This booking payment pending.</p>
      </div>
    );
  }
  if (booking?.payment === "paid") {
    return (
      <div className="text-center">
        <p className="text-yellow-500">This booking already paid.</p>
      </div>
    );
  }

  if(isLoading) return <Loader />


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="shad-dialog text-black sm:max-w-md">
        <form onSubmit={handleSubmit(handleConfirm)}>
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize">{type} Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this {type.toLowerCase()} action
              {/* for car name: {booking?.car?.name}? */}
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <Label htmlFor="returnTime" className="block text-sm font-medium">
              Select Return Time:
            </Label>
            <Input
              type="time"
              id="returnTime"
              value={returnTime}
              {...register("endTime")}
              onChange={(e) => setReturnTime(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              className="bg-[#FEA633] hover:bg-[#FEA633] px-10"
            >
              Yes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnCarModal;
