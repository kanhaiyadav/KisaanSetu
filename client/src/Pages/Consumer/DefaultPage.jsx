import { motion } from "framer-motion";
import Card from "./cards";
const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Adjust the stagger delay
        },
    },
};



const DefaultPage = () => {
    return (
        <div className={`relative flex items-center justify-center w-full h-[600px] bg-[url(/homeBanner.jpg)] bg-cover
             before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-gray-900
            `} style={{ backgroundPosition: 'center -230px, left 100px' }}>
            <motion.div
                className="w-full flex justify-evenly absolute top-full translate-y-[-50%]"
                variants={parentVariants}
                initial="hidden"
                animate="visible"
            >
                <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
            </motion.div>
        </div>
)
}

export default DefaultPage;