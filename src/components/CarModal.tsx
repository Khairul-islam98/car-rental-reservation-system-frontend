import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useGetUpdateBookingsMutation } from "@/redux/features/booking/bookingApi";

export interface IBookingModalProps {
  _id?: string;
  id: string;
  isBooked: "unconfirmed" | "confirmed" | "cancelled";
  endTime: string;
  startTime: string;
  car: { name: string, status: string; image: string; _id?: string; };
  user: {_id?: string; name: string; email: string };
  payment: string;
  createdAt: Date;
  updatedAt: Date;
}



const CarModal = ({ type, booking, children }: {type: string, booking: IBookingModalProps, children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);

  const [updateBooking, { isLoading, isError, isSuccess }] = useGetUpdateBookingsMutation();


  const handleConfirm = async () => {
    try {
      const bookingId = booking._id || booking.id; 
      if (!bookingId) {
        throw new Error("Booking ID is undefined!");
      }
     const res = await updateBooking({
        bookingId,
        isBooked: "confirmed",
        car: booking.car,
        user: booking.user,
  
      }).unwrap();
      console.log(res);

      setOpen(false);
    } catch (error) {
    //   console.error("Failed to update booking:", error);
    }
  };

  if (booking?.isBooked === "cancelled") {
    return (
      <div className="text-center">
        <p className="text-red-500">This booking has already been cancelled.</p>
      </div>
    );
  }

  if (booking?.payment === "pending") {
    return (
      <div className="text-center">
        <p className="text-red-500">Pending Payment.</p>
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="shad-dialog text-black sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            Confirm {type} Action
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to confirm this {type.toLowerCase()} action for
            car name: {booking?.car?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button className="text-white" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            className="bg-[#FEA633] hover:bg-[#FEA633]"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes"}
          </Button>
        </div>
        {isError && <p className="text-red-500">Failed to update booking.</p>}
        {isSuccess && <p className="text-green-500">Booking updated successfully!</p>}
      </DialogContent>
    </Dialog>
  );
};

export default CarModal;
