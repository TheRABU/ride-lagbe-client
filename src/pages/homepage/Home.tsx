import AboutUs from "@/modules/home/AboutUs";
import Banner from "../../modules/home/Banner";
import Hero from "../../modules/home/Hero";
import HowItWork from "../../modules/home/HowItWork";
import Services from "../../modules/home/Services";
import ServicesNew from "../../modules/home/ServicesNew";
import Testimonials from "../../modules/home/Testimonials";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <HowItWork />
      </div>
      <div>
        <Banner />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div>
        <ServicesNew />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
