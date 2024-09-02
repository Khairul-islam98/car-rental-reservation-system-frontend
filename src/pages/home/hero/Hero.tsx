/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import hero from "../../../assets/images/hero.png";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import SearchCard from "./SearchCard";

const Hero = () => {
  const [date, setDate] = useState<Date>();
  const [carData, setCarData] = useState<any[]>([]);
  const [noCarsMessage, setNoCarsMessage] = useState(false);
  const { handleSubmit, control } = useForm();

  const { data } = useGetAllCarsQuery({});

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const filteredCars = data?.data?.filter(
      (car: any) =>
        car.status === "available" && car.location === formData.location
    );

    setCarData(filteredCars || []);
    setNoCarsMessage(filteredCars && filteredCars.length === 0);

    console.log(carData);
  };

  return (
    <>
      <div className="relative bg-gray-50 flex items-center justify-center py-16 px-8 lg:px-16">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FEA633] opacity-60 clip-path-diagonal"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2">
            <div className="bg-white py-2 px-4 rounded-full inline-flex items-center text-sm font-semibold mb-4 dark:text-gray-600">
              <span role="img" aria-label="thumbs-up" className="mr-2">
                👍
              </span>
              100% Trusted car rental platform in the World
            </div>
            <h1 className="text-4xl font-black text-gray-600 mb-4">
              Find Your Best{" "}
              <span className="text-[#FEA633]">Car for Rental</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Discover unparalleled comfort and style with our premium car
              rentals. Whether you need a sleek sedan, a versatile SUV, or a
              luxurious convertible, we offer a diverse fleet to match your
              needs and elevate your driving experience.
            </p>
            <Button className="mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[48px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
              <span className=" relative z-10">Book Now →</span>
            </Button>
          </div>

          {/* Car Image */}
          <div className="hidden lg:block lg:w-1/2 mt-8 lg:mt-0">
            <img src={hero} alt="Car" className="w-full h-auto" />
          </div>
        </div>
      </div>
      <div className="px-4 relative -top-6 bottom-0">
        <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg mx-auto w-full max-w-lg sm:max-w-4xl sm:-z-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <div className="flex-1 flex flex-col w-full md:w-80 justify-center items-center mx-auto">
                <label
                  className="block text-gray-700 font-bold mb-2 text-center"
                  htmlFor="location"
                >
                  Location
                </label>

                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select a option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"dhaka"}>Dhaka</SelectItem>
                          <SelectItem value={"chittagong"}>
                            Chittagong
                          </SelectItem>
                          <SelectItem value={"feni"}>Feni</SelectItem>
                          <SelectItem value={"noakhali"}>Noakhali</SelectItem>
                          <SelectItem value={"coxbazar"}>Cox Bazar</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex-1 flex flex-col mx-auto ">
                <label
                  className="block text-gray-700 font-bold mb-2 text-center"
                  htmlFor="pickup-date"
                >
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[260px] md:w-[320px] justify-center font-normal  ",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 text-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center justify-center mx-auto mt-5 sm:justify-start ">
                <Button
                  type="submit"
                  className="w-full mt-2 md:w-40 cursor-pointer bg-[#FEA633] text-white relative h-[48px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
                >
                  <span className=" relative z-10">Search</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="py-8">
        <div className="">
          {noCarsMessage ? (
            <p className="text-center text-gray-600 text-2xl mx-auto dark:text-white">
              No cars available at this location.
            </p>
          ) : (
            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center mx-auto">
              {carData.map((car: any) => (
                <SearchCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
