import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Testimonial from "./testimonial/Testimonial";
import WhyChoose from "./whychoose/WhyChoose";

const Home = () => {
    return (
        <>
            <Hero />
            <Featured />
            <WhyChoose />
            <Testimonial />
        </>
    );
};

export default Home;