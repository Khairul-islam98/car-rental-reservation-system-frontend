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
import { useUpdateMyBookingMutation } from "@/redux/features/booking/bookingApi";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditBookingModalProps {
  booking: {
    _id: string;
    id: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    car: {
      _id: string;
    };
    startTime: string;
    endTime: string;
    payment: string;
    isBooked: string;
  };
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({ booking }) => {
  const [open, setOpen] = useState(false);
  //   const [returnTime, setReturnTime] = useState("");
  const [updateMyBooking] = useUpdateMyBookingMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.endTime < data.startTime) {
      toast.error("End time should be after start time");
      return;
    }

    const bookingData = {
      id: booking._id,
      startTime: data.startTime,
      endTime: data.endTime,
      user: booking.user._id,
      car: booking.car?._id,
    };
    console.log(bookingData);
    try {
      const res = await updateMyBooking({
        id: booking._id,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();
      if (res?.success) {
        toast.success("booking update successfully!");
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update booking ");
    }
  };
  if (booking?.payment === "paid") {
    return (
      <div className="text-center">
        <p className="text-yellow-500">This booking already paid.</p>
      </div>
    );
  }
  if (booking?.isBooked === "unconfirmed") {
    return (
      <div className="text-center">
        <p className="text-yellow-500">Booking aprove to change.</p>
      </div>
    );
  }
  if (booking?.isBooked === "cancelled") {
    return (
      <div className="text-center">
        <p className="text-red-500">Not Change.</p>
      </div>
    );
  }
  if (booking?.payment === "pending") {
    return (
      <div className="text-center">
        <p className="text-yellow-500">You Can Paid First.</p>
      </div>
    );
  }

  return (
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge
          onClick={() => setOpen(true)}
          variant={"outline"}
          className="cursor-pointer"
        >
          Edit
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="hover:text-[#FEA633] font-semibold">
            Edit Booking
          </DialogTitle>
          <DialogDescription>
            Make changes to your booking here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <p className="col-span-3 text-gray-600">{booking.user.name}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email:
            </Label>
            <p className="col-span-3 text-gray-600">{booking.user.email}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              type="time"
              id="returnTime"
              defaultValue={booking.startTime}
              //   value={returnTime}
              {...register("startTime")}
              //   onChange={(e) => setReturnTime(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {booking.isBooked === "cancelled" ||
            booking.isBooked === "unconfirmed" ? (
              <p className=" col-span-3">
                This Booked not change EndTime
              </p>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4 col-span-6">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  type="time"
                  id="returnTime"
                  defaultValue={booking.endTime}
                  //   value={returnTime}
                  {...register("endTime")}
                  //   onChange={(e) => setReturnTime(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm col-span-1"
                />
              </div>
            )}
            {/* {booking.isBooked === 'unconfirmed'  ?  <p className=' col-span-3'>This Booked unconfirmed not change EndTime</p> : <Input
              type="time"
              id="returnTime"
              defaultValue={booking.endTime}
            //   value={returnTime}
              {...register("endTime")}
            //   onChange={(e) => setReturnTime(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
            }  */}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
            >
              <span className="relative z-10">Edit Booking</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default EditBookingModal;
