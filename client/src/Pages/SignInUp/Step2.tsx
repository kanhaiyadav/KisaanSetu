import Container from "@/components/Container";
import Form from "@/components/Form";
// import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../components/styles.css";
import SignUpButton from "@/components/SignUpButton";
import { useForm } from "react-hook-form";
import { setSignup } from "../../redux/form/form.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
    const form = useForm<FormType>();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    // const [phone, setPhone] = useState();
    // const handleChange = (value) => {
    //     setPhone(value);
    // }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    interface FormType {
        name: string;
        email: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
        address: string;
    }

    const onSubmit = (data: FormType) => {
        dispatch(setSignup(data));
        navigate('/signup/3');
    }


    return (
        <Container>
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">Personal Details</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <i className="text-sm text-red-500">{errors.name?.message}</i>
                    <input className={`peer PhoneInputInput ${errors.name ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="text" placeholder="Your Name" autoFocus {...register("name", {
                        required: 'Name is required*',
                        minLength: {
                            value: 3,
                            message: 'Name should have atleast 3 characters*'
                        }
                    })} />
                </div>
                <div>
                    <i className="text-sm text-red-500">{errors.email?.message}</i>
                    <input className={`peer PhoneInputInput ${errors.email ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="email" placeholder="Your Email" {...register("email", {
                        required: 'Email is required*',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address*'
                        },
                        validate: {
                            unique: async(value) => {
                                const response = await fetch(
                                    `${import.meta.env.VITE_BACKEND_URL}/api/users/unique`,
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ email: value }),
                                    }
                                );
                                const data = await response.json();
                                if (data.error) {
                                    return 'Email already exists*';
                                }
                            }
                        }
                    })} />
                </div>
                {/* <PhoneInput onChange={handleChange} value={phone} placeholder="Enter phone number" defaultCountry="IN" /> */}
                <div className="flex gap-2 items-end">
                    <div>
                        <i className="text-sm text-red-500">{errors.country?.message}</i>
                        <input className={`peer PhoneInputInput ${errors.country ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="text" placeholder="Country" {...register("country", {
                            required: 'Country is required*',
                            minLength: {
                                value: 3,
                                message: 'atleast 3 characters*'
                            }
                        })} />
                    </div>
                    <div>
                        <i className="text-sm text-red-500">{errors.state?.message}</i>
                        <input className={`peer PhoneInputInput ${errors.state ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="text" placeholder="State" {...register("state", {
                            required: 'State is required*',
                            minLength: {
                                value: 3,
                                message: 'atleast 3 characters*'
                            }
                        })} />
                    </div>
                </div>
                <div className="flex gap-2 items-end">
                    <div>
                        <i className="text-sm text-red-500">{errors.city?.message}</i>
                        <input className={`peer PhoneInputInput ${errors.city ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="text" placeholder="City" {...register("city", {
                            required: 'City is required*',
                        })} />
                    </div>
                    <div>
                        <i className="text-sm text-red-500">{errors.pincode?.message}</i>
                        <input className={`peer PhoneInputInput ${errors.pincode ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="text" placeholder="Pincode" {...register("pincode", {
                            required: 'Pincode is required*',
                            pattern: {
                                value: /^[1-9][0-9]{5}$/,
                                message: 'Invalid Pincode*'
                            }
                        })} />
                    </div>
                </div>
                <div>
                    <i className="text-sm text-red-500">{errors.address?.message}</i>
                    <textarea className={`peer PhoneInputInput ${errors.address? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} placeholder="Address" cols={4} {...register("address", {
                        required: 'Address is required*',
                        minLength: {
                            value: 10,
                            message: 'Address should have atleast 10 characters*'
                        }
                    })} />
                </div>
                <SignUpButton type='submit' style={{ width: '100%' }}><>Next</></SignUpButton>
            </Form>
        </Container>
    );
}

export default Step2;