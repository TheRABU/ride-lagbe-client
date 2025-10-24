import taxi from "../../assets/taxi.jpg";

const Hero = () => {
  return (
    <>
      <div className=" relative ">
        <section className="rounded-t-4xl max-h-min lg:min-h-min mx-auto w-full bg-[#131010] flex items-center justify-center pt-16">
          <section className="text-white body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font text-4xl mb-4 font-medium text-white">
                  Book your ride now
                  <br className="hidden lg:inline-block" />
                  with Ride Lagbe
                </h1>
                <p className="mb-8 leading-relaxed">
                  Copper mug try-hard pitchfork pour-over freegan heirloom
                  neutra air plant cold-pressed tacos poke beard tote bag.
                  Heirloom echo park mlkshk tote bag selvage hot chicken
                  authentic tumeric truffaut hexagon try-hard chambray.
                </p>

                <div className="flex justify-center">
                  <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    Book Ride
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded-md"
                  alt="hero"
                  src={taxi}
                />
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Hero;
