import { FaDollarSign, FaWarehouse, FaHeadset, FaTruck, FaShieldAlt, FaUserCheck } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaDollarSign className="text-4xl text-yellow-500" />,
      title: "Best Prices",
      description:
        "We offer the most competitive prices in the market, ensuring you get the best value for your money.",
    },
    {
      icon: <FaWarehouse className="text-4xl text-yellow-500" />,
      title: "Wide Selection",
      description:
        "Our extensive product range means you'll find exactly what you're looking for, from the latest trends to classic favorites.",
    },
    {
      icon: <FaHeadset className="text-4xl text-yellow-500" />,
      title: "24/7 Support",
      description:
        "Our dedicated customer support team is available around the clock to assist with any questions or concerns you may have.",
    },
    {
      icon: <FaTruck className="text-4xl text-yellow-500" />,
      title: "Fast Shipping",
      description:
        "Enjoy prompt and reliable shipping so you can get your products delivered to you quickly and efficiently.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-yellow-500" />,
      title: "Secure Payments",
      description:
        "We use advanced security measures to ensure that your payment information is protected and transactions are safe.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-yellow-500" />,
      title: "Trusted by Thousands",
      description:
        "Join the community of satisfied customers who trust us for our quality products and excellent service.",
    },
  ];

  return (
    <section className="mt-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-600  dark:text-white">Why Choose Us?</h2>
        <p className="border-y-4 mt-2 size-10 rounded-full animate-bounce mx-auto border-[#FEA633] ..."></p>
        <p className="text-lg text-gray-600 mt-2 dark:text-white">
          Discover the key reasons why our customers love us.
        </p>
      </div>
      <div className="mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="">
              <div className="bg-white p-6 flex flex-col rounded-lg shadow-lg text-center">
               <div className="text-center mx-auto"> {feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description.slice(0, 100)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
