import CustomButton from "./CustomButton";

const Header = ({title}) => {
    return (
        <header className="h-[65px] w-full flex items-center p-4">
            <h1 className="text-3xl font-semibold text-gray-600 flex-1">{title}</h1>
            <CustomButton intent={'style'} size={'md'}>Upgrade ✨</CustomButton>
        </header>
    );
}

export default Header;