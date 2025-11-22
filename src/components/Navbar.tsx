import { Link } from "react-router";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { BsMenuButtonFill } from "react-icons/bs";
import { useState } from "react";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "./mode.toggle";
import { useIsUserLoggedInQuery } from "@/redux/features/auth/auth.api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useIsUserLoggedInQuery(undefined);

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <span className="loading loading-bars loading-xl text-4xl text-blue-700 text-center"></span>
        </div>
      </>
    );
  }

  // Check if error is an authentication error (401/403) - this is normal for logged out users
  const isAuthError =
    isError &&
    "status" in (error as any) &&
    ((error as any).status === 401 || (error as any).status === 403);

  // Only show error screen for non-auth errors (server errors, network issues, etc.)
  if (isError && !isAuthError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl font-semibold">
          Something went wrong! Please try again later
        </p>
      </div>
    );
  }

  // User is logged in if we have successful data
  const isLoggedIn = data?.success && data?.data;

  return (
    <>
      <div className="wrapper px-1 lg:px-5 py-9 relative">
        <section className="bg-[#1E201E]/80 backdrop-blur-2xl fixed top-0 left-0 right-0 z-50 mt-3 flex justify-between items-center p-6 h-12 w-full text-white font-bold rounded-3xl shadow-md mx-auto max-w-7xl">
          <div className="logo">
            <h1 className="text-2xl font-bold">Ride Lagbe</h1>
          </div>

          <div className="links flex-1 hidden lg:flex justify-center">
            <ul className="flex gap-3">
              <Link
                to={"/"}
                className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700"
              >
                Home
              </Link>
              <a
                href="#about-us"
                className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700"
              >
                About Us
              </a>
              <li className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700">
                Features
              </li>
              <li className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700">
                FAQ
              </li>
              <li className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700">
                Contact
              </li>
              {data?.data?.email && (
                <Link
                  to={"/driver/create"}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700"
                >
                  Join Driver
                </Link>
              )}
            </ul>
          </div>
          {/* {!data?.data?.email && (
           
          )} */}

          {isLoggedIn ? (
            <div>
              <UserDropdown />
            </div>
          ) : (
            <div className="buttons hidden lg:flex items-center gap-2">
              <Link to={"/auth/login"}>
                <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-4xl font-semibold hover:bg-gray-200">
                  Login
                </button>
              </Link>

              <Link to={"/auth/sign-up"}>
                <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-4xl font-semibold hover:bg-gray-200 ml-2">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <div className="ml-2">
            <ModeToggle />
          </div>

          <div>
            <button
              className="block text-3xl lg:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <BsMenuButtonFill /> : <BsFillMenuButtonWideFill />}
            </button>
          </div>
          {open && (
            <div className="lg:hidden fixed top-20 left-0 right-0 bg-[#1E201E]/95 text-white p-6 rounded-b-3xl z-40 backdrop-blur-md shadow-lg">
              <ul className="flex flex-col items-center gap-4 font-semibold">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700 w-full text-center"
                >
                  Home
                </Link>
                <a
                  href="#about-us"
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700 w-full text-center"
                >
                  About Us
                </a>
                <a
                  href="#features"
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700 w-full text-center"
                >
                  Features
                </a>
                <a
                  href="#faq"
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700 w-full text-center"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-300 cursor-pointer border-neutral-200 border rounded-4xl px-3 py-1 bg-neutral-700 w-full text-center"
                >
                  Contact
                </a>

                {/* Mobile Buttons */}
                <div className="flex flex-col gap-3 w-full mt-4">
                  <Link to="/auth/login" onClick={() => setOpen(false)}>
                    <button className="w-full bg-[#FAF7F3] text-black px-3 py-2 rounded-4xl font-semibold hover:bg-gray-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/auth/sign-up" onClick={() => setOpen(false)}>
                    <button className="w-full bg-[#FAF7F3] text-black px-3 py-2 rounded-4xl font-semibold hover:bg-gray-200">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Navbar;
