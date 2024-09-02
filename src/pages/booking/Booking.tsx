import { useEffect, useState } from "react";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import CarFilter from "../car/carfillter/CarFilter";
import BookingCard from "./BookingCard";
import Loader from "@/components/Loader";
import { ICar } from "../car/Car";

interface QueryParams {
  search?: string;
  pricePerHour?: string;
  model?: string;
  sort?: string;
  location?: string;
  carType?: string;
}

const Booking = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const { data, refetch, isLoading } = useGetAllCarsQuery(queryParams);

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  if (isLoading) return <Loader />;

  return (
    <section className="">
      <div className="bg-[#201F1D] h-44">
        <h1 className="text-center text-white font-bold text-4xl pt-16 flex justify-center items-center mx-auto">
          Bookings
        </h1>
      </div>
      <div className="mx-auto px-4 mt-10">
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="lg:w-1/4">
            <CarFilter
              setQueryParams={setQueryParams}
              queryParams={queryParams}
            />
          </div>

          {/* Cars Listing Section */}
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.length === 0 ? (
              <div className="text-white text-center col-span-full">
                No cars available.
              </div>
            ) : (
              data?.data?.map((car: ICar) => (
                <BookingCard key={car._id} car={car} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
