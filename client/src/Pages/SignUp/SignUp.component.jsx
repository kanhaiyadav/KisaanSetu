import { Outlet } from "react-router-dom";
import { Container, Image, FormContainer, Header } from "./SignUp.styles";


const SignUp = () => {
    return (
        <Container>
            <FormContainer>
                <Header>
                    <h1>Logo</h1>
                </Header>
                <Outlet />
            </FormContainer>
            <Image>
                <img src="/SignInUp.jpeg" alt="farmer"></img>
                <div></div>
            </Image>
        </Container>
    );
};

export default SignUp;