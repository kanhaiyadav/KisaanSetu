import styled from "styled-components";
import { keyframes } from "styled-components";

const slideIn = keyframes`
    0%{
        transform: translateX(100%);
    }
    40%{
        transform: translateX(-10%);
    }
    70%{
        transform: translateX(5%);
    }
    100%{
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
`; 