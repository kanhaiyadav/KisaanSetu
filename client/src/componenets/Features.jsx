import styles, { layout } from "../style";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { socialMedia } from "./../constant/index.js"
import { TbExternalLink } from "react-icons/tb";


const FeatureCard = ({ icon, title, content, index }) => {
    const { t } = useTranslation('landingPage');
    const features = t('features', { returnObjects: true });
    return (
        <div className={`w-full flex flex-row p-6 rounded-[20px] ${index !== features.length - 1}? "mb-6" : "mb-0"} feature-card`}>
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
};
const Features = () => {
    const { t } = useTranslation('landingPage');
    const features = t('featuresPage.features', { returnObjects: true });
    return (
        <section id="features" className={`flex flex-row px-[100px]`}>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className={`${layout.sectionInfo} h-fit`}>
                <h2
                    className={`${styles.heading2} font-extrabold xs:text-[32px] font-poppins
                             text-[48px] text-brown ng-[76.8px] leading-[58px] w-full
                             `}>
                    {t('featuresPage.titleP1')}<br className="sm:block hidden" />{t('featuresPage.titleP2')}
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5 text-Tprimary`}>
                    {t('featuresPage.subtitle')}
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
            </motion.div>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }} className={`${layout.sectionImg} flex-col items-start h-fit`}>
                {
                    features.map((feature, index) => (
                        <FeatureCard key={index}{...feature} />
                    ))}
            </motion.div>
        </section>
    )
}

export default Features
