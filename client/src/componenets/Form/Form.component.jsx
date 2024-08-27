import { StyledForm } from "./Form.styles";

const Form = ({children, ...otherProps}) => {
    return (
        <StyledForm {...otherProps}>
            {children}
        </StyledForm>
    );
}

export default Form;