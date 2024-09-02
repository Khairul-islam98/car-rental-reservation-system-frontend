
import { FaHandshake, FaLeaf, FaUserShield, FaChartLine, FaRecycle, FaHandsHelping } from 'react-icons/fa';

const Commitment = () => {
    const values = [
        {
          title: 'Customer Service',
          description: 'We prioritize our customers by providing top-notch service and support, ensuring their satisfaction with every interaction.',
          icon: <FaHandshake className="text-4xl text-yellow-500" />,
        },
        {
          title: 'Sustainability',
          description: 'We are committed to sustainable practices, minimizing our environmental impact and promoting eco-friendly solutions.',
          icon: <FaLeaf className="text-4xl text-yellow-500" />,
        },
        {
          title: 'Integrity',
          description: 'Integrity is at the heart of our business, guiding our decisions and actions with honesty and transparency.',
          icon: <FaUserShield className="text-4xl text-yellow-500" />,
        },
        {
          title: 'Growth',
          description: 'We believe in continuous growth and innovation, always striving to improve and expand our services.',
          icon: <FaChartLine className="text-4xl text-yellow-500" />,
        },
        {
          title: 'Recycling',
          description: 'We promote recycling and responsible waste management as part of our commitment to the environment.',
          icon: <FaRecycle className="text-4xl text-yellow-500" />,
        },
        {
          title: 'Community Support',
          description: 'Supporting our community is essential to us, and we actively participate in various local initiatives.',
          icon: <FaHandsHelping className="text-4xl text-yellow-500" />,
        },

      ];
    return (
        <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-8">
          Values & <span className='text-[#FEA633]'>Commitment</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-50 shadow-lg rounded-lg p-6">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Commitment;