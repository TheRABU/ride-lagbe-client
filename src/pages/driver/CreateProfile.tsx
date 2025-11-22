const CreateProfile = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create A new Driver Account
          </h2>
          {/* <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            Or
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              login to your account
            </a>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form method="POST" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 md:flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="nid"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  NID
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="nid"
                    name="nid"
                    placeholder="271-98789-90"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  <div className="hidden absolute inset-y-0 right-0 pr-3 md:flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <hr className="h-0.5 mt-2 bg-neutral-900 w-full" />
              <p className="text-sm mt-2 text-neutral-500 font-semibold">
                Enter Vehicle Information
              </p>
              <div className="mt-6">
                <label
                  htmlFor="nid"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Vehicle Model
                </label>
                <label
                  htmlFor="vehicleModel"
                  className="block text-sm font-medium leading-5 text-gray-700"
                ></label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="model"
                    name="model"
                    placeholder="toyota corolla"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="nid"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  License Plate Number
                </label>
                <label
                  htmlFor="vehicleModel"
                  className="block text-sm font-medium leading-5 text-gray-700"
                ></label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="license"
                    name="license"
                    placeholder="DHK-796799"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="nid"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Color
                </label>
                <label
                  htmlFor="vehicleModel"
                  className="block text-sm font-medium leading-5 text-gray-700"
                ></label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="color"
                    name="color"
                    placeholder="black/red"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="nid"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Year
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="year"
                    name="year"
                    placeholder="2011~"
                    type="number"
                    required
                    min="1950"
                    max={new Date().getFullYear()}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create account
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
