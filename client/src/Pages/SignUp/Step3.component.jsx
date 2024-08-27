import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/Header";

const Step3 = () => {
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold">Create a new password</h1>
                <i className="text-sm font-normal text-gray-500 m-0">This password will be required while login back to your account.</i>
            </Header>

            <Form>
                <input className="PhoneInputInput" type="password" placeholder="New password" style={{ padding: '9px 15px' }} autoFocus />
                <input className="PhoneInputInput" type="password" placeholder="Confirm password" style={{ padding: '9px 15px' }} />
                <SignUpButton>Submit</SignUpButton>
            </Form>
        </Container>
    );
};

export default Step3;