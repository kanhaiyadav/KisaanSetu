import { Link } from "react-router-dom";
import { Body } from "./step1.styles";
import Header from "../../../componenets/Header/Header.component";
import Container from "../../../componenets/Container/Container.component";

const Step1 = () => {
    return (
        <Container style={{padding: '20px 50px'}}>
            <Header>
               <h1>Continue as</h1>
                <i>Select from the following options whether you are a farmer or consumer</i> 
            </Header>
            <Body>
                <div><Link to={'2'}><img src="/farmer.svg" alt="" /></Link><h2>Farmer</h2></div>
                <div><Link to={'2'}><img src="/consumer.svg" alt="" /></Link><h2>Consumer</h2></div>
            </Body>
        </Container>
    )
}

export default Step1;