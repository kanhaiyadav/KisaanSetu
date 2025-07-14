import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import styles from "../style.js"
import Features from "../components/FarmersPage.jsx";
import Footer from "../components/Footer.jsx"
import Cfeatures from "../components/CustomerPage.jsx";

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
            <Footer />
        </div>
    )
}

export default LandingPage
