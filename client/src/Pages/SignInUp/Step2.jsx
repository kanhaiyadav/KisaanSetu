import { useState } from "react";
import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../componenets/styles.css";
import SignUpButton from "../../componenets/SignUpButton";
import { Link } from "react-router-dom";

const Step2 = () => {
    const [phone, setPhone] = useState();
    const handleChange = (value) => {
        setPhone(value);
    }
    return (
        <Container>
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">Personal Details</h1>
            <Form>
                <input className="PhoneInputInput" type="text" placeholder="Your Name" autoFocus />
                <input className="PhoneInputInput" type="email" placeholder="Your Email" />
                <PhoneInput onChange={handleChange} value={phone} placeholder="Enter phone number" defaultCountry="IN" />
                <div className="flex gap-2">
                    <input className="PhoneInputInput" type="text" placeholder="Country" />
                    <input className="PhoneInputInput" type="text" placeholder="State" />
                </div>
                <div className="flex gap-2">
                    <input className="PhoneInputInput" type="text" placeholder="City" />
                    <input className="PhoneInputInput" type="text" placeholder="Pincode" />
                </div>
                <textarea className="PhoneInputInput" placeholder="Address" cols={4} />
                <Link to={'../3'}><SignUpButton type='button' style={{ width: '100%' }}>Next</SignUpButton></Link>
            </Form>
        </Container>
    );
}

export default Step2;