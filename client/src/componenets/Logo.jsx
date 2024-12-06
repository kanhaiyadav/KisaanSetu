import { Link } from "react-router-dom";

const Logo = ({ expanded, ...otherProps }) => {
    return (
        <Link to="/">
            <div className={`${expanded !== false ? 'w-[60px] sm:w-[200px]' : 'w-[45px]'} h-[80px] overflow-hidden grid grid-cols-[auto,1fr] items-center justify-between
            cursor-pointer  transition-all duration-300 ease-in-out animate-expand font-normal
        `}
                {...otherProps}
            >
                <div className="w-[45px]">
                    <img src="/icon.svg" alt="" className="w-[60px] h-[60px]" />
                </div>
                {
                    expanded !== false ?
                        <p className="hidden sm:block font-brand text-brand text-3xl overflow-hidden whitespace-nowrap pr-[20px]">KisaanSetu</p>
                        : null
                }
            </div>
        </Link>
    );
};

export default Logo;