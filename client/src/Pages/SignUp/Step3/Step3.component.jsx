import Container from "../../../componenets/Container/Container.component";
import Form from "../../../componenets/Form/Form.component";
import Button from "../../../componenets/Button/Button.component";
import '../../../componenets/styles.css';
import Header from "../../../componenets/Header/Header.component";

const Step3 = () => {
    return (
        <Container>
            <Header>
                <h1>Create a new password</h1>
                <i>This password will be required while login back to your account.</i>
            </Header>
            <Form>
                <input className="PhoneInputInput" type="password" placeholder="New password" style={{padding: '9px 15px'}} autoFocus/>
                <input className="PhoneInputInput" type="password" placeholder="Confirm password" style={{padding: '9px 15px'}} />
                <Button>Submit</Button>
            </Form>
        </Container>
    );
};

export default Step3;