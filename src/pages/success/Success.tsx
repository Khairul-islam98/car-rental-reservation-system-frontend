import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import successGif from '../../assets/images/success.gif'

const Success = () => {
  
  return (
    <div className="flex items-center justify-center py-4 mb-20">
      <div className="">
      
        <section className="flex flex-col items-center mb-5">
          <img src={successGif} height={300} width={280} alt="success" />
          <h2 className="header mb-6 mx-w-[600px] text-center">
            You <span className="text-[#FEA633]">Booking request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        
        <Button variant="outline" className="text-center mx-auto flex cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl">
          <Link to='/booking' className=" relative z-10">New Booking</Link>
        </Button>
        
      </div>
    </div>
  );
};

export default Success;
