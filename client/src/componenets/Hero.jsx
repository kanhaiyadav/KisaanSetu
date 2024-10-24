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
        <div className='mt-[100px]'>
            <section className="bg-white mb-[20px]">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <motion.h1
                            variants={container(0)}
                            initial="hidden"
                            animate="visible" className={`font-extrabold xs:text-[48px] font-sans
                             text-[64px] text-white text-shadow-solid shadow-brown ng-[76.8px] leading-[75px] w-full
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
                       dark:text-gray-600 z-10  max-w-[470px] mt-5">
                            {t('hero.subtitle')}
                        </motion.p>
                        <Link to={'/signup'}
                            className="text-white bg-primary border border-gray-300
                     font-semibold rounded-xl hover:rounded-full text-2xl px-6 py-4 me-2 mb-2 
                     transition-all duration-[1000ms]"
                             >{t('hero.startButton')}</Link>
                        <Link to={'/signin'} className="bg-Tprimary px-10 py-4 text-2xl hover:rounded-full transition-all duration-1000 text-white font-semibold rounded-xl">{t('hero.loginButton')}</Link>

                    </div>
                    <div className={`w-[480px] h-[480px] relative lg:mt-0 lg:col-span-5 lg:flex after:content-['']
                    after:absolute after:top-[40px] after:left-[40px] after:w-full after:h-full 
                    after:bg-[#ededed]
                    after:rounded-3xl after:border-4 after:border-brown`}>
                        <img
                            src="Farmer.png"
                            alt="farmer"
                            className="z-10 animate-diaMove border-4 border-brown
                            rounded-3xl transition-shadow duration-300 ease-in-out"
                        />
                    </div>
                </div>
            </section>
            <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
                {stats.map((stat) => (
                    <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`}>
                        <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-brown'>{stat.value}</h4>
                        <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-Tprimary uppercase ml-3'>{stat.title}</p>
                    </div>
                ))}
            </section>

        </div>
    )
}

export default Hero
