import fleet1 from '../../../assets/images/fleet/Economy Car.jpeg'
import fleet2 from '../../../assets/images/fleet/Luxury Sedan.jpeg'
import fleet3 from '../../../assets/images/fleet/SUV.jpg'
import fleet4 from '../../../assets/images/fleet/Convertible.jpg'
import fleet5 from '../../../assets/images/fleet/Minivan.jpeg'
import fleet6 from '../../../assets/images/fleet/Pickup Truck.jpeg'

const Fleet = () => {
    const fleet = [
        {
          name: 'Economy Car',
          type: 'Economy',
          description: 'Affordable and fuel-efficient, perfect for city driving.',
          image: fleet1,
        },
        {
          name: 'Luxury Sedan',
          type: 'Luxury',
          description: 'Premium comfort and style for a luxurious ride.',
          image: fleet2
        },
        {
          name: 'SUV',
          type: 'SUV',
          description: 'Spacious and powerful, ideal for family trips and off-road adventures.',
          image: fleet3
        },
        {
          name: 'Convertible',
          type: 'Luxury',
          description: 'Experience the thrill of open-air driving with top-down convertibles.',
          image: fleet4
        },
        {
          name: 'Minivan',
          type: 'Family',
          description: 'Comfortable and roomy, great for family vacations.',
          image: fleet5
        },
        {
          name: 'Pickup Truck',
          type: 'Utility',
          description: 'Reliable and tough, perfect for hauling and towing.',
          image: fleet6
        },
      ];
    return (
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
          Our <span className='text-[#FEA633]'>Fleet</span> 
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((car, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 rounded-lg mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
              <p className="text-gray-500 italic">{car.type}</p>
              <p className="text-gray-600">{car.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Fleet;