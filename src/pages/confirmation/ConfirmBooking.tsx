import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};
  const [createBooking, { isLoading, isError, error }] = useCreateBookingMutation();

  // State for date and start time
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleConfirm = async () => {
    console.log(bookingDetails);
    if (bookingDetails && date && startTime) {
      try {
        const result = await createBooking({ ...bookingDetails, date, startTime }).unwrap(); 
        console.log("Booking Confirmed:", result);
        // navigate("/success"); 
      } catch (err) {
        console.error("Error confirming booking:", err); 
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!bookingDetails) {
    return <p>No booking details found. Please go back and fill out the booking form.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
        <div className="space-y-2">
          <p><strong>Full Name:</strong> {bookingDetails.name}</p>
          <p><strong>NID/Passport Number:</strong> {bookingDetails.nidOrPassport}</p>
          <p><strong>Driving License Number:</strong> {bookingDetails.drivingLicense}</p>
          <p><strong>Email Address:</strong> {bookingDetails.email}</p>
          <p><strong>Contact Number:</strong> {bookingDetails.phone}</p>

          {/* Insurance Options */}
          <p><strong>Basic Insurance:</strong> {bookingDetails.basicInsurance ? 'Yes' : 'No'}</p>
          <p><strong>Full Coverage Insurance:</strong> {bookingDetails.fullInsurance ? 'Yes' : 'No'}</p>
          <p><strong>Premium Insurance:</strong> {bookingDetails.premiumInsurance ? 'Yes' : 'No'}</p>

          {/* Additional Features */}
          <p><strong>GPS:</strong> {bookingDetails.gps ? 'Yes' : 'No'}</p>
          <p><strong>Child Seat:</strong> {bookingDetails.childSeat ? 'Yes' : 'No'}</p>

          {/* Date Input */}
          <div className="mt-4">
            <label htmlFor="date" className="block font-semibold mb-2">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Start Time Input */}
          <div className="mt-4">
            <label htmlFor="startTime" className="block font-semibold mb-2">Start Time:</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
        </div>

        {/* Show error message if there's an error */}
        {isError && <p className="text-red-500">Error: {error?.message}</p>}

        <div className="flex justify-between mt-6">
          <Button onClick={handleBack} className="bg-gray-600 text-black">Back</Button>
          <Button
            onClick={handleConfirm}
            className={`bg-[#FEA633] text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || !date || !startTime} // Disable button if date or start time is not selected
          >
            {isLoading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
