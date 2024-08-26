import { StyledContainer } from "./Container.styles";

const Container = ({ children, ...otherProps }) => {
    return (
        <StyledContainer {...otherProps}>
            {children}
        </StyledContainer>
    );
}

export default Container;