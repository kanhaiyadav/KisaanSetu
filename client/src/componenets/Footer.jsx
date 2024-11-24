import styles from "./../style.js"
import Logo from '../componenets/Logo';
import { footerLinks, socialMedia } from "./../constant/index.js"

const Footer = () => {
    return (
        <section className={`bg-orange-100 flex-col h-fit pb-[50px]`}>
            <div className={`flex justify-between md:flex-row flex-col mb-8 w-full px-[20px] md:px-[50px]`}>
                <div className="flex-[1] flex flex-col justify-start">
                    <div className="flex items-center">
                        <img src="/icon.svg" className="w-[60px] h-[60px]" alt="" />
                        <span className="font-brand text-brand text-3xl overflow-hidden whitespace-nowrap pr-[20px]">KisaanSetu</span>
                    </div>
                    <p className={`${styles.paragraph} relative top-[-20px] left-[20px] mt-4 max-w-full md:max-w-[200px] text-md md:text-lg text-Tprimary`}>
                        A new way for eliminating intermediaries and
                        reducing wastage.
                    </p>
                </div>

                <div className="flex-[1.5] w-full flex flex-row justify-between gap-4 md:gap-0">
                    {footerLinks.map((footerlink) => (
                        <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[100px] md:min-w-[150px]`}>
                            <h4 className="font-poppins text-nowrap font-medium text-lg md:text-xl leading-[27px] text-brown">
                                {footerlink.title}
                            </h4>
                            <ul className="list-none mt-4">
                                {footerlink.links.map((link, index) => (
                                    <li
                                        key={link.name}
                                        className={`font-poppins hover:underline font-normal text-[16px] leading-[24px] text-Tprimary hover:text-secondary cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                                            }`}
                                    >
                                        {link.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
                <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-brown">
                    Copyright Ⓒ 2022 KisaanSetu. All Rights Reserved.
                </p>

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
        </section>
    )
}

export default Footer
