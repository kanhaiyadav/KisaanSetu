import styles, { layout } from "../style";
import { features} from '../constant';
import {motion} from "framer-motion";

const FeatureCard = ({icon,title,content,
    index}) => (
     <div className={`flex flex-row p-6 rounded-[20px] ${index!==features.length-1}? "mb-6" : "mb-0"} feature-card`}>
      <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
        <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
          <h4 className="font-poppins font-semibold text-brown text-[18px] leading-[23px] mb-1">
            {title}
          </h4>
          <p className="font-poppins font-normal text-Tprimary text-[16px] leading-[24px] mb-1">
            {content}
          </p>
      </div>
     </div>
    )
const Features = () => {
  return (
    <section id="features" className={layout.section}>
      <motion.div 
       whileInView={{opacity:1,x:0}}
                 initial={{opacity:0,x:-100}}
                 transition={{duration:1}}
      className={layout.sectionInfo}>
        <h2
        className={styles.heading2}>
        Harvest your success<br className="sm:block hidden" />connect with buyers effortlessly.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-Tprimary`}>
        Simplify your marketplace experience and focus on what you do best—farming. Start growing your business today with effortless connections and increased opportunities.
        </p>
        
      </motion.div>
      <motion.div
      whileInView={{opacity:1,x:0}}
             initial={{opacity:0,x:100}}
             transition={{duration:1}} className={`${layout.sectionImg} flex-col`}>
        {
          features.map((feature) => (
            <FeatureCard key={features.id}{...feature}/>
          ))}
      </motion.div>
    </section>
  )
}

export default Features
