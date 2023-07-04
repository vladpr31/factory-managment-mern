import React from "react";

const HomePage = () => {
  return (
    <>
      <section className="bg-[url('https://bluespaceltd.co.uk/wp-content/uploads/2020/08/A-Office-Design-scaled.jpg')] bg-cover bg-center lg:bg-center h-screen">
        <div className="bg-black bg-opacity-[0.45] p-20 h-screen ">
          <header className="">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold text-center text-white">
                Welcome to Our Factory
              </h1>
              <p className="text-white text-center p-2 py-24">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod mauris vel varius sollicitudin.
              </p>
            </div>
          </header>
        </div>
      </section>
      <section className="py-48 bg-gray-200 h-screen text-center">
        <div className="container mx-auto px-4">
          <span className="absolute text-[64px] left-0 right-0 bottom-[-240px] text-gray-300 opacity-60 -z-[0]">
            PRODUCTS
          </span>
          <h2 className="text-2xl font-semibold mb-10 backdrop-blur-sm z-[1] w-fit mx-auto">
            Our Products
          </h2>

          <div className="grid grid-cols-1 md: grid-cols-2 lg: grid-cols-3 gap-8">
            {/* Product Cards */}
            <div className="bg-white rounded-2xl shadow-md p-4 ">
              <h3 className="text-xl font-semibold mb-6">Product 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod mauris vel varius sollicitudin. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed euismod mauris vel varius
                sollicitudin.
              </p>
            </div>

            <div className="bg-white rounded shadow-md p-4">
              <h3 className="text-xl font-semibold mb-6">Product 2</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod mauris vel varius sollicitudin. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed euismod mauris vel varius
                sollicitudin.
              </p>
            </div>

            <div className="bg-white rounded shadow-md p-4">
              <h3 className="text-xl font-semibold mb-6">Product 3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod mauris vel varius sollicitudin. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed euismod mauris vel varius
                sollicitudin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Contact Us
          </h2>
          <p className="text-center">
            If you have any questions or inquiries, please feel free to reach
            out to us.
          </p>
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Contact
            </button>
          </div>
        </div>
      </section>
      <section id="about">
        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <p className="text-center">
              © 2023 Our Factory. All rights reserved.
            </p>
          </div>
        </footer>
      </section>
    </>
  );
};

export default HomePage;
