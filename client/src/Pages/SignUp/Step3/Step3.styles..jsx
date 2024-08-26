import styled from "styled-components";


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 400px;
`;


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    border-radius: 10px;
    width: clamp(300px, 70%, 420px);
    h1{
        margin: 0 0 20px 0;
        font-family: 'Open Sans', sans-serif;
    }
`;