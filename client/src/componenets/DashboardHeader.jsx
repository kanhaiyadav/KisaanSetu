const Header = ({title}) => {
    return (
        <header className="h-[60px] shadow-md w-full">
            <h1 className="text-3xl font-bold text-[#333] text-center py-3">{title}</h1>
        </header>
    );
}

export default Header;