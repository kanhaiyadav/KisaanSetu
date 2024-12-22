//@ts-ignore
import { Link } from "react-scroll";
 
const TestPage = () => {
    return (
        <div id="scroll-container" className="overflow-scroll h-screen">
            <nav>
                <Link
                    to="section1"
                    smooth
                    duration={500}
                    onSetActive={() => console.log('Section 1')}
                    containerId="scroll-container"
                >
                    Section 1
                </Link>
                <Link
                    to="section2"
                    smooth
                    duration={500}
                    onSetActive={() => console.log('Section 2')}
                    containerId="scroll-container"
                >
                    Section 2
                </Link>
            </nav>
            <div id="section1" style={{ height: '100vh', backgroundColor: 'lightblue' }}>Section 1</div>
            <div id="section2" style={{ height: '100vh', backgroundColor: 'lightgreen' }}>Section 2</div>
        </div>
    );
};

export default TestPage;