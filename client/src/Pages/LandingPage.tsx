import Navbar from "../componenets/Navbar"
import Hero from "../componenets/Hero"
import styles from "../style.js"
import Features from "../componenets/FarmersPage.jsx";
import Footer from "../componenets/Footer.jsx"
import Cfeatures from "../componenets/CustomerPage.jsx";

const LandingPage = () => {
    return (
        <div id="landing-page" className="bg-[#fdfdfd] w-screen h-screen overflow-x-hidden overflow-y-scroll bg-[url('/bgCloud.svg')] bg-fixed bg-cover bg-no-repeat">
            <Navbar />
            <div className={`relative h-[calc(100vh-100px)] flex justify-center items-end`}>
                <div className="absolute left-0 bottom-0 w-full aspect-[6/0.985] bg-[url('/wave-haikei2.svg')] bg-contain bg-no-repeat">
                </div>
                <div className="absolute left-0 bottom-0 w-full h-[20px] bg-primary" />
                <Hero />
            </div>
            <div id='farmer' className={`bg-white min-h-screen flex flex-col items-center justify-start`}>
                <div className="bg-white w-full h-[250px] bg-[url('/wave4.svg')] bg-cover"></div>
                <Features />
            </div>
            <div id='customer' className={`bg-white min-h-screen flex flex-col pt-[50px] items-center justify-center`}>
                <Cfeatures />
                <div className="bg-white w-full h-[400px] bg-[url('/wave5.svg')] bg-cover"></div>
            </div>
            {/* <div id="customer" className={`relative bg-white w-full h-screen px-[100px] pt-[50px]`}>
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
            </div> */}

            <Footer />

        </div>
    )
}

export default LandingPage
