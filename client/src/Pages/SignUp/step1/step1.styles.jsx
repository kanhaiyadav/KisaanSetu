import styled from "styled-components";

export const Body = styled.div`
    display: flex;
    gap: 50px;
    margin: 20px 0;
    div{
        text-align: center;
        width: 200px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 15px;
        a{
            width: 100%;
            height: 200px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 1px 2px 5px 2px rgba(0,0,0,0.3); 
            transition: transform 0.3s ease;
            border: 2px solid #d39a57;
            &:hover{
                box-shadow: 1px 2px 20px 3px rgba(0,0,0,0.3); 
                transform: scale(1.1);
                border: 3px solid #d39a57;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        h2{
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
        }
    }
`; 

export const Container = styled.div`
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    padding: 20px 50px;
    border-radius: 10px;
`;