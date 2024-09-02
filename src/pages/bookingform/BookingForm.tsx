import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, FieldValues, SubmitHandler } from "react-hook-form";


interface BookingFormProps {
    name: string;
    email: string;
    phone: string;
    nidOrPassport: string;
    drivingLicense: string;
    basicInsurance: boolean;
    fullInsurance: boolean;
    premiumInsurance: boolean;
    gps: boolean;
    childSeat: boolean;
    carId: string;
}



const BookingForm = () => {
  const { id: carId } = useParams();
  console.log(carId);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, control } = useForm<BookingFormProps>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      nidOrPassport: '',
      drivingLicense: '',
      basicInsurance: false,
      fullInsurance: false,
      premiumInsurance: false,
      gps: false,
      childSeat: false
    }
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const bookingDetails = { ...data, carId };
    // Handle form submission logic here, such as sending data to an API
    navigate("/confirm-booking", { state:  { bookingDetails} });
  };

  return (
    <>
      <div className="bg-[#201F1D] h-44">
        <h1 className="text-center text-white font-bold text-4xl pt-16 flex justify-center items-center mx-auto">
          Booking Form
        </h1>
      </div>
      <div className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Information Form */}
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                id="name"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <Input
                placeholder="NID/Passport Number"
                id="nid-passport"
                {...register("nidOrPassport", { required: "NID/Passport Number is required" })}
              />
              {errors.nidOrPassport && <p className="text-red-500 text-sm">{errors.nidOrPassport.message}</p>}

              <Input
                placeholder="Driving License Number"
                id="driving-license"
                {...register("drivingLicense", { required: "Driving License Number is required" })}
              />
              {errors.drivingLicense && <p className="text-red-500 text-sm">{errors.drivingLicense.message}</p>}

              <Input
                placeholder="Email Address"
                id="email"
                type="email"
                {...register("email", { required: "Email Address is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <Input
                placeholder="Contact Number"
                id="contact-number"
                type="tel"
                {...register("phone", { required: "Contact Number is required" })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Insurance Options */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Insurance Options</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <Controller
                    name="basicInsurance"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="basic-insurance" 
                        checked={field.value} 
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    )}
                  />
                  <label htmlFor="basic-insurance" className="ml-2 text-sm font-medium leading-none">
                    Basic Insurance (Included)
                  </label>
                </div>
                <div className="flex items-center">
                  <Controller
                    name="fullInsurance"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="full-insurance" 
                        checked={field.value} 
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    )}
                  />
                  <label htmlFor="full-insurance" className="ml-2 text-sm font-medium leading-none">
                    Full Coverage Insurance (+$15/day)
                  </label>
                </div>
                <div className="flex items-center">
                  <Controller
                    name="premiumInsurance"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="premium-insurance" 
                        checked={field.value} 
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    )}
                  />
                  <label htmlFor="premium-insurance" className="ml-2 text-sm font-medium leading-none">
                    Premium Insurance (+$25/day, includes theft protection)
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Additional Features</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <Controller
                    name="gps"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="gps" 
                        checked={field.value} 
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    )}
                  />
                  <label htmlFor="gps" className="ml-2 text-sm font-medium leading-none">
                    GPS
                  </label>
                </div>
                <div className="flex items-center">
                  <Controller
                    name="childSeat"
                    control={control}
                    render={({ field }) => (
                      <Checkbox 
                        id="child-seat" 
                        checked={field.value} 
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    )}
                  />
                  <label htmlFor="child-seat" className="ml-2 text-sm font-medium leading-none">
                    Child Seat
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-6 w-full bg-[#FEA633] text-white">
              Book Now
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
