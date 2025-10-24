import { FaCrown, FaRocket, FaStar } from "react-icons/fa";

const ServicesNew = () => {
  const services = [
    {
      id: 1,
      title: "Service Pack 1",
      price: "Premium BDT 200",
      icon: <FaStar className="text-sky-300 text-3xl" />,
    },
    {
      id: 2,
      title: "Service Pack 2",
      price: "Standard BDT 150",
      icon: <FaRocket className="text-sky-300 text-3xl" />,
    },
    {
      id: 3,
      title: "Service Pack 3",
      price: "Basic BDT 100",
      icon: <FaCrown className="text-sky-300 text-3xl" />,
    },
    {
      id: 4,
      title: "Service Pack 4",
      price: "Pro BDT 250",
      icon: <FaRocket className="text-sky-300 text-3xl" />,
    },
  ];

  return (
    <>
      <div className="min-h-md mx-auto bg-black px-2">
        <h2 className="block w-full text-center mb-4 py-5 bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
          Choose the premium packages
        </h2>
        <section className="grid mx-auto mt-16 grid-cols-2 gap-6 w-full sm:max-w-2xl">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 
            shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:scale-105 transition-transform duration-300 ease-in-out
            w-full h-40 sm:h-48 md:h-52 bg-black/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-2">
                {service.icon}
                <h2 className="text-lg sm:text-xl font-semibold">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-sky-300">
                  {service.price}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ServicesNew;
