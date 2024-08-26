import { useState } from "react";
import Container from "../../../componenets/Container/Container.component";
import { Form, Input, Group } from "./Step2.styles";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import './styles.css';
import Button from "../../../componenets/Button/Button.component";
import { Link } from "react-router-dom";

const Step2 = () => {
    const [phone, setPhone] = useState();
    const handleChange = (value) => {
        setPhone(value);
    }
    return (
        <Container>
            <h1>Personal Details</h1>
            <Form>
                <Input className="PhoneInputInput" type="text" placeholder="Your Name" autoFocus />
                <Input className="PhoneInputInput" type="email" placeholder="Your Email" />
                <PhoneInput onChange={handleChange} value={phone} placeholder="Enter phone number" defaultCountry="IN" />
                <Group>
                    <Input className="PhoneInputInput" type="text" placeholder="Country" />
                    <Input className="PhoneInputInput" type="text" placeholder="State" />
                </Group>
                <Group>
                    <Input className="PhoneInputInput" type="text" placeholder="City" />
                    <Input className="PhoneInputInput" type="text" placeholder="Pincode" />
                </Group>
                <textarea className="PhoneInputInput" placeholder="Address" cols={4} />
                <Link to={'../3'}><Button type='button' style={{ width: '100%' }}>Next</Button></Link>
            </Form>
        </Container>
    );
}

export default Step2;