import Navbar from "../componenets/Navbar"
import Hero from "../componenets/Hero"
import styles from "../style.js"
import Features from "../componenets/Features.jsx";
import Footer from "../componenets/Footer.jsx"
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { socialMedia } from "./../constant/index.js"
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="bg-[#fdfdfd] w-screen h-screen overflow-x-hidden overflow-y-scroll bg-[url('/bgCloud.svg')] bg-fixed bg-cover bg-no-repeat">
            <Navbar />
            <div className={`relative h-[calc(100vh-100px)] flex justify-center items-center`}>
                <div className="absolute left-0 bottom-0 w-full h-[250px] bg-[url('/wave-haikei2.svg')] bg-cover bg-no-repeat">
                </div>
                <Hero />
            </div>
            <div className={`bg-[#fdfdfd] ${styles.flexStart} h-screen`}>
                <div className={`${styles.boxWidth}`}>
                    <Features />
                </div>
            </div>
            <div className={`relative w-full h-screen bg-[url('/customer.svg')] bg-no-repeat bg-cover bg-right-bottom px-[100px]`}>
                {/* Add a pseudo-element for the gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/60 to-white opacity-50 pointer-events-none z-0"></div>

                <div className="z-10 relative">
                    <h1 className="text-5xl font-sans font-black text-brown">Fresh Picks<br /> for Smart Shoppers</h1>
                    <p className="text-xl text-gray-600 max-w-[50%] mt-4 font-poppins">
                        Experience the joy of buying farm-fresh produce directly from local farmers, with transparency, quality, and trust at the heart of every purchase
                    </p>
                </div>

                <div className="w-[50%] h-fit mt-10 flex flex-col gap-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <VscWorkspaceTrusted className="text-3xl text-brown" />
                        <div>
                            <h2 className="font-sans text-xl font-bold text-brown">Quality You Can Trust</h2>
                            <p className="text-gray-600 font-poppins">Enjoy farm-fresh produce with full transparency on quality and origin.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaDollarSign className="text-3xl text-brown" />
                        <div>
                            <h2 className="font-sans text-xl font-bold text-brown">Transparent Pricing</h2>
                            <p className="text-gray-600 font-poppins">
                                Say goodbye to middlemen and enjoy fair prices for premium produce. Contact and Bargain directly with the farmers
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdOutlineRateReview className="text-3xl text-brown" />
                        <div>
                            <h2 className="font-sans text-xl font-bold text-brown">Buy with Confidence</h2>
                            <p className="text-gray-600 font-poppins">Rate products, explore reviews, and choose the best for your family.</p>
                        </div>
                    </div>
                </div>

                <hr className="border-t-2 border-brown w-[50%] mt-6 z-10 relative" />
                <div className="py-4 flex justify-between items-center w-[50%] z-10 relative">
                    <div className="flex gap-4 text-xl text-gray-600 items-center">
                        <Link to="/signup">
                            <button className={`px-6 py-4 bg-primary text-white text-2xl hover:bg-brown rounded-full`}>Get Started</button>
                        </Link>
                        <Link to="/signin" className="hover:underline">Continue As Guest</Link>
                    </div>
                    <div className="flex flex-row md:mt-0 mt-6">
                        {socialMedia.map((social, index) => (
                            <img
                                key={social.id}
                                src={`/${social.icon}`}
                                alt={social.id}
                                className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}
                                onClick={() => window.open(social.link)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={`bg-orange-100 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>

        </div>
    )
}

export default LandingPage
