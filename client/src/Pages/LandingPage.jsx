import Navbar from "../componenets/Navbar"
import Hero from "../componenets/Hero"
import styles from "../style.js"
import Features from "../componenets/Features.jsx";
import Footer from "../componenets/Footer.jsx"
const LandingPage = () => {
    return (
        <div className="bg-[#fdfdfd] w-screen h-screen overflow-x-hidden overflow-y-scroll bg-[url('/bgCloud.svg')] bg-fixed bg-cover bg-no-repeat">
            <Navbar />
            <div className={`relative h-[calc(100vh-100px)] flex justify-center items-center`}>
                <div className="absolute left-0 bottom-0 w-full h-[250px] bg-[url('/wave-haikei2.svg')] bg-cover bg-no-repeat">
                </div>
                <Hero />
            </div>
            <div className="w-screen min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/Farmer.svg')]">
            </div>
            <div className={`bg-[#fdfdfd] ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Features />
                </div>
            </div>
            <div className={`bg-[#fdfdfd] ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>

        </div>
    )
}

export default LandingPage
