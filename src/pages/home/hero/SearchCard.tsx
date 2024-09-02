import { Button } from '@/components/ui/button';
import { ICar } from '@/pages/car/Car';
import { Link } from 'react-router-dom';


const SearchCard = ({ car }: {car: ICar}) => {

  


    return (
        <div className="lg:max-w-80 h-full rounded-lg border border-gray-200 p-4 flex flex-col gap-4">
        <div className="image-container">
          <img className="rounded-md magnifier w-full h-48 " src={car?.image} alt="" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-600 ">{car?.name}</h3>
            <p>{car?.description.slice(0, 60) || "Description not available"}</p>
            <p className='text-gray-600 dark:text-white'>Location: {car?.location}</p>
            <div className="flex justify-between items-center">
              <h3 className=" font-semibold text-[#CB1836]">
               Price Per Hour: <span className=''>$ {car?.pricePerHour}</span>
              </h3>
             
            </div>
          </div>
  
          <Link to={`/car-details/${car?._id}`}>
          <Button className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
            <span className=' relative z-10'>See Details</span>
          </Button>
          </Link>
        </div>
      </div>
    );
};

export default SearchCard;