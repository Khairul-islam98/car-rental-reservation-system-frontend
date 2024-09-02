/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBookingsQuery } from '@/redux/features/booking/bookingApi';
import DataTable from './datatable/DataTable';
import { columns } from './datatable/columns/Columns';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const ManageReturnCar = () => {
    const { data, refetch, isLoading } = useGetAllBookingsQuery(undefined);

    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        if (data) {
          const filteredBookings = data.data?.filter(
            (booking: any) =>
              booking.isBooked === "confirmed" || booking.car?.status === "unavailable"
          );
          setBookings(filteredBookings);
        }
      }, [data, refetch]); 
      

    if (isLoading) {
        return <Loader />
    }


    

    return (
        <div>
            <DataTable columns={columns}  data={bookings}  />
        </div>
    );
};

export default ManageReturnCar;
