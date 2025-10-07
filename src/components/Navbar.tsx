

const Navbar = () => {
  return (
    <>
        <div className="wrapper px-5 py-3">
            <section className="bg-[#1E201E] flex justify-between items-center p-3 h-16 w-full text-white font-bold rounded-md shadow-md mx-auto">
                <div className="logo">
                    <h1 className="text-2xl font-bold">Ride Lagbe</h1>

                </div>
                
                 <div className="links flex-1 flex justify-center">
                    <ul className="flex gap-8">
                        <li className="hover:text-gray-300 cursor-pointer">Home</li>
                        <li className="hover:text-gray-300 cursor-pointer">About</li>
                        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
                    </ul>
                    </div>

                <div className="buttons flex items-center gap-2">
                        <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-md font-semibold hover:bg-gray-200">Login</button>
                        <button className="bg-[#FAF7F3] text-black px-3 py-1 rounded-md font-semibold hover:bg-gray-200 ml-2">Sign Up</button>
                </div>
            </section>
        </div>
        
    </>
  )
}

export default Navbar