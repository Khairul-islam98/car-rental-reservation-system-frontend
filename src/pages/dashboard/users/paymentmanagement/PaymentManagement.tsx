import { Button } from "@/components/ui/button";
import { useGetMyBookingQuery } from "@/redux/features/booking/bookingApi";
import { usePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Booking = {
  _id: string;
  car: { name: string; image: string };
  user: { email: string };
  totalCost: number;
  payment: string;
};

const PaymentManagement = () => {
  const { data, error, isLoading: isFetching } = useGetMyBookingQuery({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [initiatePayment, { isLoading: isInitiatingPayment }] = usePaymentMutation();

  useEffect(() => {
    if (data) {
      const filterMyBookings = data.data?.filter(
        (booking: Booking) => booking.payment === "pending"
      );
      setBookings(filterMyBookings || []);
    }
  }, [data]);

  const handlePayment = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const initializePayment = async () => {
    if (!selectedBooking) return;

    try {
      const response = await initiatePayment({
        bookingId: selectedBooking._id,
        email: selectedBooking.user.email,
        cost: selectedBooking.totalCost,
      }).unwrap();

      if (response.success && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast.error("Error occurred during payment initialization.");
    }
  };

  return (
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center">
      {isFetching ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>Error fetching bookings.</p>
      ) : bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={booking.car?.image}
              className="w-32 h-32 mx-auto object-cover"
              alt={booking.car?.name || "Car"}
            />
            <h3 className="text-lg font-semibold mb-2">{booking.car?.name}</h3>
            <p className="text-gray-600 mb-1">Total Cost: ${booking.totalCost}</p>
            <p className="text-gray-600 mb-1">Payment: {booking.payment}</p>
            <Button
              type="button"
              onClick={() => handlePayment(booking)}
              className="w-20 mt-2 cursor-pointer bg-[#FEA633] text-white h-[50px] border shadow-2xl transition-all hover:shadow-gray-600 hover:text-white font-bold text-2xl"
            >
              Pay
            </Button>
          </div>
        ))
      )}

      {showModal && selectedBooking && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
            <p className="text-gray-600 mb-2">Car: {selectedBooking.car?.name}</p>
            <p className="text-gray-600 mb-2">Total Cost: ${selectedBooking.totalCost}</p>
            <p className="text-gray-600 mb-4">Email: {selectedBooking.user.email}</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={initializePayment}
                className="bg-[#FEA633] text-white px-4 py-2 rounded"
                disabled={isInitiatingPayment}
              >
                {isInitiatingPayment ? "Processing..." : "Confirm & Pay"}
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
