import { Link } from "react-router-dom";

const Logo = ({ expanded, setExpanded, ...otherProps }) => {
    return (
        <Link to="/">
            <div className={`${expanded !== false ? 'w-[200px]' : 'w-[45px]'} h-[80px] overflow-hidden flex items-center justify-between
            cursor-pointer  transition-all duration-300 ease-in-out animate-expand font-normal
        `}
                onClick={() => {
                    setExpanded(!expanded)
                    console.log('clicked')
                }}
                {...otherProps}
            >
                <div className="w-[60px]">
                    <img src="/icon.svg" alt="" className="w-[60px] h-[60px]" />
                </div>
                {
                    expanded !== false ?
                        <p className="font-brand text-brand text-3xl overflow-hidden whitespace-nowrap pr-[20px]">KisaanSetu</p>
                        : null
                }
            </div>
        </Link>
    );
};

export default Logo;