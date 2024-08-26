import { Container, Form } from "./Step3.styles.";
import Button from "../../../componenets/Button/Button.component";
import '../Step2/styles.css';

const Step3 = () => {
    return (
        <Container>
            <h1>Create a new password</h1>
            <Form>
                <input className="PhoneInputInput" type="password" placeholder="New password" />
                <input className="PhoneInputInput" type="password" placeholder="Confirm password" />
                <Button>Submit</Button>
            </Form>
        </Container>
    );
};

export default Step3;