import { StyledHeader } from "./Header.styles";

const Header = ({children}) => {
    return (
        <StyledHeader>
            {children}
        </StyledHeader>
    );
}

export default Header;