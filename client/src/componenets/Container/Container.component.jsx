import { StyledContainer } from "./Container.styles";

const Container = ({ children }) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
}

export default Container;