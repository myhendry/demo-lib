import React from "react";
import { Layout } from "../../../../components/common";

interface Props {}

const MerakiUi = (props: Props) => {
  return (
    <Layout>
      <section className="bg-white dark:bg-gray-800">
        <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center justify-between">
            <div>
              <a
                className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"
              >
                Brand
              </a>
            </div>

            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div className="flex flex-col mt-4 space-y-2 lg:mt-0 lg:flex-row lg:space-x-16 lg:space-y-0">
            <a
              className="text-gray-700 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
              href="#"
            >
              Home
            </a>
            <a
              className="text-gray-700 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
              href="#"
            >
              Components
            </a>
            <a
              className="text-gray-700 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
              href="#"
            >
              Pricing
            </a>
            <a
              className="text-gray-700 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
              href="#"
            >
              Contact
            </a>
          </div>

          <a
            className="block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
            href="#"
          >
            Get started
          </a>
        </nav>

        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
              Building Your Next App with our Awesome components
            </h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              similique obcaecati illum mollitia.
            </p>
            <button className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 md:mx-0 md:w-auto focus:outline-none">
              Start 14-Day free trial
            </button>
            <p className="mt-3 text-sm text-gray-400 ">
              No credit card required
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <div className="w-full h-64 bg-blue-600 rounded-xl md:w-4/5"></div>
          </div>
        </div>
      </section>
      <header className="bg-white dark:bg-gray-800">
        <nav className="border-b dark:border-gray-700">
          <div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
            <div className="flex items-center justify-between">
              <div>
                <a
                  className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                  href="#"
                >
                  Brand
                </a>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="Toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div className="items-center lg:flex">
              <div className="flex flex-col mt-4 space-y-8 lg:flex-row lg:items-center lg:mt-0 lg:space-y-0 lg:space-x-16">
                <a
                  className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
                  href="#"
                >
                  glasses Search
                </a>
                <a
                  className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
                  href="#"
                >
                  How it works!
                </a>
                <a
                  className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
                  href="#"
                >
                  Why us?
                </a>
                <a
                  className="block font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
                  href="#"
                >
                  Contact
                </a>

                <button className="flex items-center px-5 py-2 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-128 lg:py-16 lg:flex-row lg:items-center lg:space-x-6">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-2xl font-medium tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                Find your premium new glasses exported from US
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We work with the best remunated glasses dealers in US to find
                your new glasses.
              </p>
              <div className="grid gap-6 mt-8 sm:grid-cols-2">
                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>Premium selection</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>Insurance</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>All legal documents</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>From US glasses dealers</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>Payment Security</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-800 dark:text-gray-200">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  <span>Fast shipping (+ Express)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full max-w-2xl rounded-md"
              src="https://images.unsplash.com/photo-1555181126-cf46a03827c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="glasses photo"
            />
          </div>
        </div>
      </header>
    </Layout>
  );
};

export default MerakiUi;
