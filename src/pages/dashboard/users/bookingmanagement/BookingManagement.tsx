import { useGetMyBookingQuery } from "@/redux/features/booking/bookingApi";
import DataTable from "./dataTable.tsx/DataTable";
import { columns } from "./dataTable.tsx/columns/Columns";
import Loader from "@/components/Loader";


const BookingManagement = () => {
  const { data, isLoading } = useGetMyBookingQuery({});

  if (isLoading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-bold">My Booking</h1>
      <p className="">Manage Booking</p>
      <p className="flex justify-end font-semibold mb-4">
        Total Booking: {data?.data?.length}
      </p>
      <DataTable columns={columns} data={data?.data} />
    </div>
  );
};

export default BookingManagement;
