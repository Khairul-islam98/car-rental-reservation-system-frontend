import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { columns } from "./datatable/columns/Columns";
import DataTable from "./datatable/DataTable";
import Loader from "@/components/Loader";

const ManageBooking = () => {
    const { data, isLoading } = useGetAllBookingsQuery({});

    if(isLoading) return <Loader />

    return (
        <div>
            <h1 className="text-2xl font-bold">All Bookings</h1>
            <p className="flex justify-end">Total Booking: {data?.data?.length}</p>
            <DataTable columns={columns} data={data?.data} />
        </div>
    );
};

export default ManageBooking;