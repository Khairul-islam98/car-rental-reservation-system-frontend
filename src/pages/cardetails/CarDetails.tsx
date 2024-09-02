import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { Link, useParams } from "react-router-dom";
import ImageMagnifier from "@/components/imagemagnifier/ImageMagnifier";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/Loader";

interface ICar {
  name: string;
  description: string;
  pricePerHour: number;
  image: string;
  features: string[];
  status: string;
  reviews: IReview[];
}

interface IReview {
  reviewer: string;
  comment: string;
  rating: number;
}

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSingleCarQuery(id);

  if (isLoading) return <Loader />;
  if (isError || !data) return <div className="container mx-auto p-6 py-10">No car details found.</div>;

  const { name, description, pricePerHour, image, features, status, reviews } = data.data as ICar;

  return (
    <div className="container mx-auto p-6 py-10">
      <div className="flex flex-wrap">
        {/* Car Image Section */}
        <div className="w-full image-container lg:w-1/2">
          <ImageMagnifier imageUrl={image} />
        </div>

        {/* Car Details Section */}
        <div className="w-full lg:w-1/2 pl-6 space-y-4">
          <h2 className="text-3xl font-bold mb-4">Name: {name}</h2>
          <p className="text-lg mb-4">Description: {description}</p>
          <p className="text-2xl font-bold mb-4">Price: ${pricePerHour} /hour</p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="flex flex-wrap gap-2">
              {features?.map((feature, index) => (
                <li key={index} className="text-sm mb-1">
                  <Badge variant="secondary">- {feature}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability Status */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Availability</h3>
            <Badge
              className={`px-2 py-1 rounded ${
                status === "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
              variant="outline"
            >
              {status}
            </Badge>
          </div>

          {/* Additional Features */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Additional Features</h3>
            {["Wifi", "GPS", "Child Seat"].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Checkbox id={feature.toLowerCase()} />
                <label htmlFor={feature.toLowerCase()} className="text-sm font-medium leading-none">
                  {feature}
                </label>
              </div>
            ))}
          </div>

          {/* Insurance Options */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Insurance Options</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="basic-insurance" />
              <label htmlFor="basic-insurance" className="text-sm font-medium leading-none">
                Basic Insurance (Included)
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="full-insurance" />
              <label htmlFor="full-insurance" className="text-sm font-medium leading-none">
                Full Coverage Insurance (+$15/day)
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="premium-insurance" />
              <label htmlFor="premium-insurance" className="text-sm font-medium leading-none">
                Premium Insurance (+$25/day, includes theft protection)
              </label>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="py-4 border-y space-y-4">
            <h3 className="text-xl font-semibold text-gray-600 mb-1">Cancellation Policy:</h3>
            <p className="text-gray-600 p-4 bg-gray-100 w-full rounded-xl">
              You can cancel your booking at no cost up to 24 hours before the scheduled pick-up time. Cancellations made within 24 hours of the pick-up time may incur a fee. No refunds will be given for no-shows or early returns. Changes to your booking may affect the cancellation terms.
            </p>
          </div>

          {/* Book Now Button */}
          <Button
            className={`mt-2 bg-[#FEA633] text-white relative overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl ${
              status === "unavailable" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={status === "unavailable"}
            aria-label="Book Now"
          >
            <Link to={`/booking-form/${id}`}>
              <span className="relative z-10">Book Now</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        <div>
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <p className="font-semibold">{review.reviewer}</p>
                <p>{review.comment}</p>
                <p className="text-yellow-500">Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
