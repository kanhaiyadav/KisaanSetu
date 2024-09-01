import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/SignInUpHeader";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/user/user.slice";


const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm();
    const { register, control, handleSubmit } = form;
    const onSubmit = (data) => {
        dispatch(signIn(data)).unwrap()
            .then((res) => {
                if(res.data.isfarmer)
                    navigate('/farmer');
                else
                    navigate('/consumer');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Welcom Back!</h1>
                <i className="text-sm font-normal text-gray-500 m-0">Enter your email and password to continue.</i>
            </Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <input className="PhoneInputInput" name="email" type="email" placeholder="Your email" style={{ padding: '9px 15px' }} autoFocus {...register('email')} />
                <input className="PhoneInputInput" name="password" type="password" placeholder="Confirm password" style={{ padding: '9px 15px' }} {...register('password')} />
                <SignUpButton>Sign In</SignUpButton>
            </Form>
            <DevTool control={control} />
        </Container>
    );
};

export default SignIn;