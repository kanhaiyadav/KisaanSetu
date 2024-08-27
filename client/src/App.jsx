import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp.component'
import Step1 from './Pages/SignUp/step1/step1.component'
import Steps from './Pages/SignUp/steps'
import Farmer from './Pages/Farmer/Farmer.component'
import LandingPage from './Pages/LandingPage'

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/signup" element={<SignUp />} >
                <Route index element={<Step1 />} />
                <Route path=":id" element={<Steps />} />
            </Route>
            <Route path='/farmer' element={<Farmer />}>
            
            </Route>
        </Routes>
    )
}

export default App
