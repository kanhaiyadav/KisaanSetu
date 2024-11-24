import styles, { layout } from "../style.js";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { socialMedia } from "../constant/index.js"
import { TbExternalLink } from "react-icons/tb";
import FeatureCard from "./featureCard.jsx";



const Features = () => {
    const { t } = useTranslation('landingPage');
    const features = t('farmerFeaturesPage.features', { returnObjects: true });
    return (
        <section id="features" className={`w-full grid sm:grid-cols-2 grid-cols-1 grid-rows-[auto,auto,auto] sm:grid-rows-[1fr,auto] px-[20px] sm:pl-[30px] md:px-[50px] lg:px-[100px]`}>
            <div className={`${layout.sectionInfo} h-fit`}>
                <h2
                    className={`font-bold font-poppins text-brown w-full md:font-extrabold lg:text-left 
                             text-3xl sm:text-4xl md:text-5xl leading-[clamp(30px,7vw,64px)] justify-self-center self-center 
                             `}>
                    {t('farmerFeaturesPage.titleP1')}<br/>{t('farmerFeaturesPage.titleP2')}
                </h2>
                <p className={`mt-5 text-gray-700 font-poppins text-md lg:text-lg`}>
                    {t('farmerFeaturesPage.subtitle')}
                </p>
            </div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20% 0%" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.3,
                        },
                    },
                }}
                className={`flex flex-col gap-4 pt-4 items-start h-fit col-span-2 sm:col-start-2 sm:col-span-1 sm:row-start-1 sm:row-end-2 row-start-2 row-end-3`}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <FeatureCard {...feature} type="farmer" />
                    </motion.div>
                ))}
            </motion.div>
            <div className="col-span-2  xl:col-span-1 sm:row-start-2 sm:row-end-3 row-start-3 row-end-4">
                <hr className="border-t-2 border-brown w-full mt-6" />
                <div className="py-4 pr-2 md:pr-8 flex  justify-between xs:items-center w-full h-fit">
                    <div className="flex xs:flex-row flex-col gap-2 md:gap-4 text-xl text-gray-600 items-center">
                        <Link to="/signup" ><button className={`px-4 sm:px-6 sm:py-4 py-[10px] text-nowrap bg-primary text-white text-xl  sm:text-2xl hover:bg-brown rounded-full`}>Get Started</button></Link>
                        <Link to="/signin" className="flex items-center text-nowrap gap-2 text-lg md:text-xl">Learn more <TbExternalLink /></Link>
                    </div>
                    <div className="flex flex-row xs:mt-0 mt-2">
                        {socialMedia.map((social, index) => (
                            <img
                                key={social.id}
                                src={`/${social.icon}`}
                                alt={social.id}
                                className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                                    }`}
                                onClick={() => window.open(social.link)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
