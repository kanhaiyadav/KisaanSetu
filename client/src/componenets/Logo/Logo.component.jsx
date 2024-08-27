const Logo = ({expanded}) => {
    return (
        <div className={`${expanded?'w-[200px]':'w-[45px]'} h-[80px] flex items-center justify-between`}>
            <div>
                <img src="/icon.svg" alt="" className="w-[60px] h-[60px]"/>
            </div>
            {
                expanded ?
                    <p className="font-brand text-brand text-3xl">KisaanSetu</p>
                    : null
            }
        </div>
    );
};

export default Logo;