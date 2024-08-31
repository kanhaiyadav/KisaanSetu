import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/SignInUpHeader";

const SignIn = () => {
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Welcom Back!</h1>
                <i className="text-sm font-normal text-gray-500 m-0">Enter your email and password to continue.</i>
            </Header>

            <Form>
                <input className="PhoneInputInput" type="email" placeholder="Your email" style={{ padding: '9px 15px' }} autoFocus />
                <input className="PhoneInputInput" type="password" placeholder="Confirm password" style={{ padding: '9px 15px' }} />
                <SignUpButton>Sign In</SignUpButton>
            </Form>
        </Container>
    );
};

export default SignIn;