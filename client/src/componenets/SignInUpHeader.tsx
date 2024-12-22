const Header = ({ children }: {children: React.ReactNode}) => {
    return (
        <header className="mb-5 w-full">
            {children}
        </header>
    );
};

export default Header;
