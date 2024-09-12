import Card from "./cards";

const DefaultPage = () => {
    return (
        <div className={`relative flex items-center justify-center w-full h-[450px] bg-[url(/homeBg6.png)] bg-cover
             before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-gray-900
            `} style={{ backgroundPosition: 'center -50px' }}>
            <div className="w-full flex justify-evenly absolute top-full translate-y-[-50%]">
                <Card title1={'Healthy'} title2={'Vegetables'} description={'Fresh, locally grown vegetables for a healthier, sustainable lifestyle'} img={'/vegetables.png'} />
                <Card title1={'Juicy'} title2={'Fruits'} description={'Handpicked, farm-fresh fruits for a naturally sweet and nutritious choice.'} img={'/fruits.png'} style={{ paddingRight: '0px' }} />
                <Card title1={'Wholesome'} title2={'Grains'} description={'Wholesome, quality grains for a nutritious and balanced diet.'} img={'/grains.png'} />
            </div>
        </div>
)
}

export default DefaultPage;