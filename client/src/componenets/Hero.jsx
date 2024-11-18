import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import styles from "../style";
import { useTranslation } from 'react-i18next';

const container = (delay) => (
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
        <section id='hero' className={`w-full h-full px-[100px] z-10`}>
            <motion.h1
                style={{ gridArea: 'title' }}
                variants={container(0)}
                initial="hidden"
                animate="visible" className={` font-extrabold xs:text-[42px] font-poppins
                             text-[64px] text-brown ng-[65px] leading-[65px] w-full
                             `}>
                {t('hero.titleP1')}  <br className='sm:block hidden' />{" "}
                <span className='text-gradient'>
                    {t('hero.titleP2')}
                </span>
                <br className='sm:block hidden' />
                <span className='text-gradient'>
                    {t('hero.titleP3')}
                </span>
            </motion.h1>
            <motion.p variants={container(0.5)}
                initial="hidden"
                animate="visible" className="relative mb- font-poppins
                     font-normal text-Tprimary lg:mb-8
                      md:text-lg lg:text-xl leading-[30.8px]
                       dark:text-gray-600 z-10  max-w-[470px] mt-5"
                style={{ gridArea: 'subtitle' }}
            >
                {t('hero.subtitle')}
            </motion.p>
            <div style={{ gridArea: 'buttons' }}>
                <Link to={'/signup'}
                    className="text-white bg-primary border border-gray-300
                     font-semibold rounded-xl hover:rounded-full text-2xl px-6 py-4 me-2 mb-2 
                     transition-all duration-[1000ms]">{t('hero.startButton')}</Link>
                <Link to={'/signin'} className="bg-Tprimary px-10 py-4 text-2xl hover:rounded-full transition-all duration-1000 text-white font-semibold rounded-xl">{t('hero.loginButton')}</Link>
            </div>
            <div style={{gridArea: 'img'}} className={`min-w-[400px] bg-center w-full relative lg:mt-0 lg:col-span-5 lg:flex bg-[url('marketplace.svg')] bg-no-repeat bg-contain`}>
            </div>
        </section>
    )
}

export default Hero
