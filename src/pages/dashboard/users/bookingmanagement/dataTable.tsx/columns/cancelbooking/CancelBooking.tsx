import { IBookingModalProps } from "@/components/CarModal";
import { Badge } from "@/components/ui/badge";
import { useDeleteMyBookingMutation } from "@/redux/features/booking/bookingApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CancelBooking = ({id, booking}: {id: string, booking: IBookingModalProps}) => {
   const [cancelBooking] = useDeleteMyBookingMutation()
    const handleDelete = async (id: string) => {
                
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!",
        });
    
        if (result.isConfirmed) {
          try {
            const res = await cancelBooking(id).unwrap();
            if (res?.success) {
              Swal.fire({
                title: "Cancel!",
                text: "Your Cancel Booking.",
                icon: "success",
              });
            } else {
              toast.error("Failed to cancel booking");
            }
          } catch (err) {
            toast.error("Failed to cancel booking");
          }
        }
      };

      if (booking?.payment === "paid") {
        return (
          <div className="text-center">
            
          </div>
        );
      }
      if (booking?.isBooked === "unconfirmed") {
        return (
          <div className="text-center">
            
          </div>
        );
      }
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


    return (
        <div>
             <Badge onClick={() => handleDelete(id)} variant="destructive">
        cancel
      </Badge>
        </div>
    );
};

export default CancelBooking;