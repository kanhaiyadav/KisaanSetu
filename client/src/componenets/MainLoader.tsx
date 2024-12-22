import { lineWobble } from 'ldrs'

lineWobble.register()
const MainLoader = () => {
    return ( 
        <div className="flex items-center justify-center flex-col w-full h-full">
            <img src="/icon.svg" alt="icon" className="w-[200px] h-[200px]" />
            <l-line-wobble
                size="80"
                stroke="5"
                bg-opacity="0.2"
                speed="1.75"
                color="#97c44b"
            ></l-line-wobble>
        </div>
    );
}

export default MainLoader;