import { FaClock, FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

const Contact = () => {
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
       <h1 className="text-center text-gray-600 font-bold text-4xl pt-16 flex justify-center items-center mx-auto dark:text-white">
          Contact 
        </h1>
      <section className="py-12">
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
    </div>
  );
};

export default Contact;
