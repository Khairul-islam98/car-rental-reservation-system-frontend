import { ICar } from "@/pages/car/Car";
import CarCard from "@/pages/car/carcard/CarCard";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";

const Featured = () => {
    const { data } = useGetAllCarsQuery({});
  return (
    <section className="">
      {/* title and description */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2 ">
        <h2
          className="text-3xl md:text-4xl text-gray-600 font-bold text-center dark:text-white"
        >
          Our Best Offers
        </h2>
        <p className="text-gray-600 dark:text-white">
          Take a look at our best deals on high-demand cars. These featured
          vehicles come with outstanding features, competitive pricing, and are
          ready to hit the road whenever you are.
        </p>
      </div>
      {/* items */}
      <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center mx-auto">
        {data?.data?.slice(0, 6).map((car: ICar) => (
          <div key={car._id}>
            <CarCard  car={car} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
