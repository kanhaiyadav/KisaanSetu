import { useTranslation } from "react-i18next";
import styles from "../style";

const FeatureCard = ({ icon, title, content, index, type }) => {
    const { t } = useTranslation('landingPage');
    let features = [];
    if (type === 'farmer') features = t('farmerFeaturesPage.features', { returnObjects: true })
    else features = t('customerFeaturesPage.features', { returnObjects: true });
    return (
        <div className={`w-full flex flex-row rounded-[20px] ${index !== features.length - 1}? "mb-6" : "mb-0"} feature-card`}>
            <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
                <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
            </div>
            <div className="flex-1 flex flex-col ml-3">
                <h4 className="font-poppins font-semibold text-brown lg:text-xl text-lg mb-1">
                    {title}
                </h4>
                <p className="font-poppins font-normal text-gray-700 lg:text-lg text-md mb-1">
                    {content}
                </p>
            </div>
        </div>
    )
};

export default FeatureCard;