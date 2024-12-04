import { useRef } from "react";
import Card from "./cards";
import { Farmers } from './data.js'
import FarmerCard from "../../componenets/FarmerCard";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const DefaultPage = () => {

    const farmerCardsRef = useRef(null);
    const categoryRef = useRef(null);

    const scroll = (scrollOffset, ref) => {
        if (ref.current) {
            const scrollAmount = ref.current.scrollWidth * 0.1;
            ref.current.scrollBy({
                top: 0,
                left: scrollOffset > 0 ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-y-auto bg-white w-full">

            <div className={`relative flex w-full aspect-[16/9] md:aspect-[16/8] bg-[url(/shopping.svg)] bg-cover bg-no-repeat bg-right-top
        `} style={{ backgroundPosition: 'center 0px, right 0px' }}>
                <div className="w-fit ml-[20px] xs:ml-[60px] md:ml-[80px] lg:ml-[100px] xl:ml-[150px] mt-[10px] xs:mt-[40px] md:mt-[60px] lg:mt-[70px] xl:mt-[100px]">
                    <h1 id="gr_heading" className="xs:pb-[3px] sm:pb-[10pxccd] font-Playfair_Display text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary">Quality</h1>
                    <h1 className="mt-[-5px] xs:mt-0 font-Playfair_Display text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brown">Farmed</h1>
                    <h1 className="mt-[-5px] xs:mt-0 font-Playfair_Display text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brown">Trusted</h1>
                    <p className="mt-2 xl:mt-4 max-w-[150px] xs:max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[450px] text-[9px] xs:text-xs sm:text-sm lg:text-lg xl:text-xl font-poppins text-gray-600">Discover the finest produce, grown with care. Shop with confidence, knowing you&apos;re supporting local growers and choosing the best for your family</p>
                </div>
            </div>

            <div className="px-4 md:px-8 mt-4 relative bg-white">
                <div className="flex w-full justify-between">
                    <h1 className="text-lg sm:text-xl xs:text-2xl lg:text-3xl font-bold text-gray-700 mb-1 md:mb-4">Categories</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll(-300, categoryRef)}
                            className="bg-gray-200 rounded-full grid place-items-center w-[30px] sm:w-[45px] h-[30px] sm:h-[45px] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)] hover:bg-primary hover:text-white text-gray-700"
                        >
                            <FaChevronLeft className="text-lg sm:text-2xl" />
                        </button>

                        <button
                            onClick={() => scroll(300, categoryRef)}
                            className="bg-gray-200 rounded-full hover:bg-primary hover:text-white text-gray-700 grid place-items-center w-[30px] sm:w-[45px] h-[30px] sm:h-[45px] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]"
                        >
                            <FaChevronRight className="text-lg sm:text-2xl" />
                        </button>
                    </div>
                </div>
                <div className="relative w-full m-auto group">
                    <div
                        ref={categoryRef}
                        className="w-full overflow-x-scroll py-2 scrollbar-hide flex gap-4 px-2"
                    >
                        <div className="flex gap-4">
                            <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                            <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                            <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
                            <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                            <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                            <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
                            <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                            <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                            <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
                            <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                            <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                            <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-8 mt-8 relative">
                <div className="flex justify-between">
                    <h1 className="text-lg sm:text-xl xs:text-2xl lg:text-3xl font-bold text-gray-700 mb-1 md:mb-4">Nearby Farmers</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll(-300, farmerCardsRef)}
                            className="bg-gray-200 rounded-full grid place-items-center w-[30px] sm:w-[45px] h-[30px] sm:h-[45px] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)] hover:bg-primary hover:text-white text-gray-700"
                        >
                            <FaChevronLeft className="text-lg sm:text-2xl" />
                        </button>

                        <button
                            onClick={() => scroll(300, farmerCardsRef)}
                            className="bg-gray-200 rounded-full hover:bg-primary hover:text-white text-gray-700 grid place-items-center w-[30px] sm:w-[45px] h-[30px] sm:h-[45px] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]"
                        >
                            <FaChevronRight className="text-lg sm:text-2xl" />
                        </button>
                    </div>
                </div>
                <div className="relative w-full m-auto group">
                    <div
                        ref={farmerCardsRef}
                        className="w-full overflow-x-scroll py-2 scrollbar-hide flex gap-4 px-2"
                    >
                        <div className="flex gap-4">
                            {Farmers.map((farmer, index) => (
                                <FarmerCard
                                    key={index}
                                    farmer={farmer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultPage;