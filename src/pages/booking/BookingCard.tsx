import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICar } from "../car/Car";

const BookingCard = ({ car }: { car: ICar }) => {
  return (
    <div className="md:max-w-80 h-96 rounded-lg border border-gray-200 p-4 flex flex-col gap-4">
      <div className="image-container">
        <img
          className="rounded-md magnifier w-full h-48 "
          src={car?.image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-700 hover:text-[#CB1836] ">
            {car?.name}
          </h3>
          <p>{car?.description.slice(0, 60) || "Description not available"}</p>
          <div className="flex justify-between items-center">
            <h3 className=" font-semibold text-[#CB1836]">
              Price Per Hour: $ {car?.pricePerHour}
            </h3>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Link to={`/car-details/${car?._id}`}>
            <Button className="mt-2 cursor-pointer bg-[#FEA633] text-white ">
              <span className=" relative z-10">See Details</span>
            </Button>
          </Link>
          <Button
            className={`mt-2 bg-[#FEA633] text-white font-bold text-2xl rounded-lg px-4 py-2 transition duration-300 hover:bg-[#D89224] ${
              car.status === "unavailable" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={car.status === "unavailable"}
            aria-label="Book Now"
          >
          <Link to={`/car-details/${car?._id}`}>
            Book Now
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
