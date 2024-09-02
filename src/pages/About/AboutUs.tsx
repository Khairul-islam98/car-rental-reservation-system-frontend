import { CheckCircleIcon } from "lucide-react";
import aboutImg from "../../assets/images/about.jpg";
import History from "./history/History";
import TeamMember from "./team/TeamMember";
import Fleet from "./fleet/Fleet";
import Commitment from "./commitment/Commitment";
import Contact from "./contact/Contact";

const AboutUs = () => {
  return (
    <div>
      <div className="bg-[#201F1D] h-44">
        <h1 className="text-center text-white font-bold text-4xl pt-16 flex justify-center items-center mx-auto">
          About Us
        </h1>
      </div>
      <section className="py-12">
        <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg md:w-[800px] mx-auto">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={aboutImg}
              alt="Car"
              className="h-full object-cover rounded-lg w-full"
            />
            <div className="absolute top-24 -left-10 bg-[#FEA633] text-white text-lg font-bold px-4 py-2 transform -translate-y-4 -rotate-90 rounded-t-lg">
              8+ years of experiences
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h4 className="text-[#FEA633] font-semibold mb-2">
              ABOUT OUR COMPANY
            </h4>
            <h2 className="text-3xl font-bold mb-4 dark:text-gray-600">
              Best Solution For Cleaning Services
            </h2>
            <p className="text-gray-600 mb-4">
              Our company has been providing top-notch cleaning services for
              over 12 years, ensuring that every space we touch shines.
            </p>
            <p className="text-gray-600 mb-6">
              From residential to commercial cleaning, we offer a wide range of
              services tailored to meet your needs. Our team is dedicated to
              delivering quality and excellence in every job.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-[#FEA633] mr-2" />
                <span>Experienced and professional staff</span>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-[#FEA633] mr-2" />
                <span>Customized cleaning solutions</span>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-[#FEA633] mr-2" />
                <span>High customer satisfaction rates</span>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-[#FEA633] mr-2" />
                <span>Eco-friendly cleaning products</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" py-12 px-4">
       <History />
      </section>
      <section className=" py-12 px-4">
        <TeamMember />
      </section>
      <section className=" py-12 px-4">
        <Fleet />
      </section>
      <section className="py-12 px-4">
        <Commitment />
      </section>
      <section className="px-4">
        <Contact />
      </section>
    </div>
  );
};

export default AboutUs;
