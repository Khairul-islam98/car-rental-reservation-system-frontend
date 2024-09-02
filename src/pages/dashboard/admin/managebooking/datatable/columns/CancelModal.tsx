import React, { useState } from "react";

import { useGetUpdateBookingsMutation } from "@/redux/features/booking/bookingApi";
import { Dialog,  DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IBookingModalProps } from "@/components/CarModal";

const CancelModal = ({ type, car, user, booking, children }: {type: string, car: string, user: string, booking: IBookingModalProps, children: React.ReactNode}) => {
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
        isBooked: "cancelled",
        car,
        user,
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
        
      </div>
    );
  }
  if (booking?.payment === "pending") {
    return (
      <div className="text-center">
       
      </div>
    );
  }
  if (booking?.payment === "paid") {
    return (
      <div className="text-center">
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
            car name: {booking?.car?.name}?
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

export default CancelModal;
