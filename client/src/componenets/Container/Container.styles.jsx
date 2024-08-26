import styled from "styled-components";
import { keyframes } from "styled-components";

const slideIn = keyframes`
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0%);
    }
`;

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    animation: ${slideIn} 0.5s ease;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    width: clamp(300px, 70%, 420px);
    border-radius: 10px;
    h1{
        margin: 0 0 20px 0;
        font-family: 'Open Sans', sans-serif;
    }
`; 