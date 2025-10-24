const Navbar = () => {
  return (
    <>
      <div className="wrapper px-1 lg:px-5 py-9 relative">
        <section className="bg-[#1E201E]/80 backdrop-blur-2xl fixed top-0 left-0 right-0 z-50 mt-3 flex justify-between items-center p-6 h-12 w-full text-white font-bold rounded-3xl shadow-md mx-auto max-w-7xl">
          <div className="logo">
            <h1 className="text-2xl font-bold">Ride Lagbe</h1>
          </div>

          <div className="links flex-1 hidden lg:flex justify-center">
            <ul className="flex gap-3">
              <li className="hover:text-gray-300 cursor-pointer rounded-4xl px-3 py-1 bg-neutral-700">
                Home
              </li>
              <li className="hover:text-gray-300 cursor-pointer rounded-4xl px-3 py-1 bg-neutral-700">
                About
              </li>
              <li className="hover:text-gray-300 cursor-pointer rounded-4xl px-3 py-1 bg-neutral-700">
                Contact
              </li>
            </ul>
          </div>

          <div className="buttons flex items-center gap-1">
            <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-4xl font-semibold hover:bg-gray-200">
              Login
            </button>
            <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-4xl font-semibold hover:bg-gray-200 ml-2">
              Sign Up
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Navbar;
