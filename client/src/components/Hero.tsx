import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import styles from '../style';
import { useTranslation } from 'react-i18next';

const container = (delay: number) => (
    {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: delay }
        },
    });

const Hero = () => {
    const { t } = useTranslation('landingPage');
    const stats = t('stats', { returnObjects: true });

    return (
        <section id='hero' className={`w-full h-full lg:px-[100px] md:px-[70px] md:pb-[50px] md:pt-0 sm:px-[30px] z-10`}>
            <motion.h1
                style={{ gridArea: 'title' }}
                variants={container(0)}
                initial="hidden"
                animate="visible"
                className={` md:font-extrabold font-bold font-Abril_Fatface tracking-wide text-center lg:text-left w-fit lg:w-full
                             text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-brown leading-[clamp(30px,7vw,64px)] justify-self-center self-center 
                             `}>
                {t('hero.titleP1')}  <br />{" "}
                <span className='text-gradient'>
                    {t('hero.titleP2')}
                </span>
                <br/>
                <span className='text-gradient'>
                    {t('hero.titleP3')}
                </span>
            </motion.h1>
            <motion.p variants={container(0.5)}
                initial="hidden"
                animate="visible" className="relative font-poppins
                     font-normal text-Tprimary lg:mb-10 self-center
                      md:text-lg lg:text-xl leading-[30.8px]
                       dark:text-gray-600 z-10 max-w-[300px]  sm:max-w-[470px] mt-5 sm:m-0 ml-[25px]"
                style={{ gridArea: 'subtitle' }}
            >
                {t('hero.subtitle')}
            </motion.p>
            <div className='h-[80px] sm:m-0 ml-[25px] flex items-center' style={{ gridArea: 'buttons' }}>
                <Link to={'/signup'}
                    className="text-white bg-primary border border-gray-300 font-sans
                     font-semibold rounded-full hover:bg-brown md:text-2xl sm:text-lg text-md md:px-6 px-4 py-[10px] sm:py-4  me-2 
                     transition-all duration-[1000ms] text-nowrap">{t('hero.startButton')}</Link>
                <Link to={'/signin'} className="bg-Tprimary font-sans md:text-2xl sm:text-lg text-md md:px-10 px-4 sm:py-4 py-[10px] transition-all duration-1000 text-white font-semibold rounded-full">{t('hero.loginButton')}</Link>
            </div>
            <div style={{gridArea: 'img'}} className={`sm:left-0 min-w-full sm:min-w-[400px] md:bg-bottom w-full relative lg:mt-0 lg:col-span-5 lg:flex bg-[url('marketplace.svg')] bg-no-repeat bg-cover sm:bg-contain`}>
            </div>
        </section>
    )
}

export default Hero
