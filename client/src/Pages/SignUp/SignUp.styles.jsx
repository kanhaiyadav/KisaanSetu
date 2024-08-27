import styled from "styled-components";

export const FormContainer = styled.div`
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

export const Image = styled.div`
    position: relative;
    width: 50%;
    div{
        position: absolute;
        top: 0px;
        height: 100%;
        width: 100%;
        background-image: url(/wave1.svg);
        background-repeat: no-repeat;
    }
    img{
        height: 100%;
        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.5);
        }
    }
`
export const Header = styled.div`
    display: flex;
    justify-items: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    font-size: 1.5rem;
    font-weight: 600;
    h1{
        margin: 0;
    }
`; 

export const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    background-size: cover;
`;