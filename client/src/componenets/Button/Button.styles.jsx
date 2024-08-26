import styled from "styled-components";

export const StyledButton = styled.button`
    padding: 5px 20px;
    font-size: 1.2rem;
    background-color: #d39a57;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
    font-family: 'Poppins', sans-serif;
    color: white;
    &:hover{
        background-color: #fcd59d;
        color: black;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
`;