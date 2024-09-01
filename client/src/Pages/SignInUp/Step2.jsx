import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../componenets/styles.css";
import SignUpButton from "../../componenets/SignUpButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { setSignup } from "../../redux/form/form.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
    const form = useForm();
    const { register, control, handleSubmit } = form;
    // const [phone, setPhone] = useState();
    // const handleChange = (value) => {
    //     setPhone(value);
    // }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
        dispatch(setSignup(data));   
        navigate('/signup/3');
    }
    
    
    return (
        <Container>
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">Personal Details</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input className="PhoneInputInput" name="name" type="text" placeholder="Your Name" autoFocus {...register("name")} />
                <input className="PhoneInputInput" name="email" type="email" placeholder="Your Email" {...register("email")} />
                {/* <PhoneInput onChange={handleChange} value={phone} placeholder="Enter phone number" defaultCountry="IN" /> */}
                <div className="flex gap-2">
                    <input className="PhoneInputInput" name="country" type="text" placeholder="Country" {...register("country")} />
                    <input className="PhoneInputInput" name="state" type="text" placeholder="State" {...register("state")} />
                </div>
                <div className="flex gap-2">
                    <input className="PhoneInputInput" name="city" type="text" placeholder="City" {...register("city")} />
                    <input className="PhoneInputInput" name="pincode" type="text" placeholder="Pincode" {...register("pincode")} />
                </div>
                <textarea className="PhoneInputInput" name="address" placeholder="Address" cols={4} {...register("address")} />
                <SignUpButton type='submit' style={{ width: '100%' }}>Next</SignUpButton>
            </Form>
            <DevTool control={ control} />
        </Container>
    );
}

export default Step2;