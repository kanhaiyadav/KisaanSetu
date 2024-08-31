import Step2 from './Step2';
import Step3 from "./Step3";
import { useParams } from "react-router-dom";

const Steps = () => {
    const { id } = useParams();
    const steps = {
        2: <Step2 />,
        3: <Step3 />
    }
    return steps[id];
};

export default Steps;