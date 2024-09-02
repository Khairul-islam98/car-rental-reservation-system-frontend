import { FaClock, FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";
import contactImg from "../../assets/images/contact.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const features = [
    {
      icon: <FaPhone className="text-4xl text-yellow-500" />,
      title: "Phone Number",
      description: "(888) 888-8888",
    },
    {
      icon: <FaEnvelope className="text-4xl text-yellow-500" />,
      title: "Email Address",
      description: "johnsmith@example.com",
    },
    {
      icon: <FaMapMarker className="text-4xl text-yellow-500" />,
      title: "Location",
      description: "Dhaka, Bangladesh",
    },
    {
      icon: <FaClock className="text-4xl text-yellow-500" />,
      title: "Opening Hours",
      description: "Mon - Sat (10.00AM - 05.30PM)",
    },
  ];
  return (
    <div>
      <div className="bg-[#201F1D] h-44">
        <h1 className="text-center text-white font-bold text-4xl pt-16 flex justify-center items-center mx-auto">
          Contact Us
        </h1>
      </div>
      <section className="py-2">
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="">
                <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg text-center">
                  <div className="text-center mx-auto"> {feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description.slice(0, 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row bg-gray-100 p-8 rounded-lg md:w-[600px] mx-auto">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={contactImg}
            alt="Contact"
            className="md:w-[400px] h-full object-cover rounded-lg w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 md:ml-6">
          <h2 className="text-2xl font-bold mb-4">
            Get in <span className="text-[#FEA633]">touch!</span>{" "}
          </h2>
          <form className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Name
              </Label>
              <Input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                type="tel"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Comments
              </Label>
              <Textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Comments"
                required
              ></Textarea>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
              >
                <span className=" relative z-10">Send Enquiry</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
