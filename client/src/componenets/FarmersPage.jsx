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
        <section id="features" className={`w-full grid grid-cols-2 px-[100px]`}>
            <div className={`${layout.sectionInfo} h-fit`}>
                <h2
                    className={`${styles.heading2} font-extrabold xs:text-[32px] font-poppins
                             text-[48px] text-brown ng-[76.8px] leading-[58px] w-full
                             `}>
                    {t('farmerFeaturesPage.titleP1')}<br className="sm:block hidden" />{t('farmerFeaturesPage.titleP2')}
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5 text-Tprimary`}>
                    {t('farmerFeaturesPage.subtitle')}
                </p>
                <hr className="border-t-2 border-brown w-full mt-6" />
                <div className="py-4 flex justify-between items-center w-full">
                    <div className="flex gap-4 text-xl text-gray-600 items-center">
                        <Link to="/signup" ><button className={`px-6 py-4 bg-primary text-white text-2xl hover:bg-brown rounded-full`}>Get Started</button></Link>
                        <Link to="/signin" className="flex items-center gap-2">Learn more <TbExternalLink /></Link>
                    </div>
                    <div className="flex flex-row md:mt-0 mt-6">
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
                className={` flex-col items-start h-fit`}
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

        </section>
    )
}

export default Features
