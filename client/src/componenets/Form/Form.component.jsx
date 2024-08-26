import { StyledForm } from "./Form.styles";

const Form = ({children}) => {
    return (
        <StyledForm>
            {children}
        </StyledForm>
    );
}

export default Form;