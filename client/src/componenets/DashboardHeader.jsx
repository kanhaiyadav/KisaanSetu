import CustomButton from "./CustomButton";

const Header = ({title}) => {
    return (
        <header className="h-[60px] w-full flex items-center p-4 pt-0 pb-0">
            <h1 className="text-3xl font-semibold text-gray-600 flex-1">{title}</h1>
            <CustomButton intent={'style'} size={'lg'}>Upgrade ✨</CustomButton>
        </header>
    );
}

export default Header;