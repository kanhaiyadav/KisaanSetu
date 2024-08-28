import { Link } from 'react-router-dom';
import Logo from '../componenets/Logo';
import { motion } from "framer-motion";

const container = (delay) => (
    {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: delay }
        },
    });

const LandingPage = () => {
    return (
        <div>
            <nav className="bg-[#fdfdfd] top-0 z-50 rounded-2xl m-10 sm:m-6 lg:m-8 font-poppins">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-700 text-lg font-medium hover:text-gray-900">
                                Home
                            </Link>
                            <Link to="/About" className="text-gray-700 text-lg font-medium hover:text-gray-900">
                                About Us
                            </Link>
                            <Link to="/Customer" className="text-gray-700 text-lg font-medium hover:text-gray-900">
                                Customer
                            </Link>
                            <Link to="/Farmer" className="text-gray-700 text-lg font-medium hover:text-gray-900">
                                Farmer
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
            <section className="bg-white">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <motion.h1
                            variants={container(0)}
                            initial="hidden"
                            animate="visible" className="relative max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-brown z-10">
                            An Online Marketplace
                        </motion.h1>
                        <motion.p variants={container(0.5)}
                            initial="hidden"
                            animate="visible" className="relative max-w-2xl mb-8 font-semibold text-grey-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-600 z-10">
                            Empowering farmers with a direct platform to sell fresh produce, and offering consumers the best quality products straight from the source.
                        </motion.p>
                        <button
                            type="button"
                            className="text-white bg-lightgreen border border-gray-300 font-boldnpm install framer-motion rounded-full text-2xl px-8 py-4 me-2 mb-2 hover:bg-white hover:text-gray-600 hover:outline-black hover:outline hover:outline-2 transition-all duration-300"
                        >
                            Get Started
                        </button>

                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex">
                        <img
                            src="Farmer.png"
                            alt="farmer"
                            className="hover:shadow-[0_0_20px_rgba(128,128,128,0.8)] transition-shadow duration-300 ease-in-out"
                        />
                    </div>
                </div>
            </section>


        </div>
    );
}

export default LandingPage;
