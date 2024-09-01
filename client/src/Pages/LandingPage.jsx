import Navbar from "../componenets/Navbar"
import Hero from "../componenets/Hero"
import styles from "../style.js"
const LandingPage = () => {
  return (
    <div className="bg-[#fdfdfd] w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
      </div>

      <div className={`bg-[#fdfdfd] ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <Hero />
        </div>
    </div>
    </div>
   
  )
}

export default LandingPage
