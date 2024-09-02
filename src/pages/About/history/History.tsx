
const History = () => {
  return (
    <div className="max-w-7xl mx-auto dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
        Our <span className="text-[#FEA633]">History</span>
      </h2>
      <p className="border-y-4 mt-2 size-10 rounded-full animate-bounce mx-auto border-[#FEA633] ..."></p>
      <p className="text-center text-gray-600 mb-12 dark:text-white">
        Since our inception, we have been committed to delivering excellence in
        everything we do. Here’s a glimpse into our journey.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Founding Year */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            Founded in 2016
          </h3>
          <p className="text-gray-600">
            We started our journey over a decade ago, with a mission to provide
            exceptional cleaning services.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To deliver the highest quality cleaning services with integrity and
            dedication, ensuring customer satisfaction.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600">
            To be recognized as the most trusted and innovative cleaning service
            provider, setting the standards in the industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
