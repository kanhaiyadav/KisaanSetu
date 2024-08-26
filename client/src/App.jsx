import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp.component'
import Step1 from './Pages/SignUp/step1/step1.component'
import Steps from './Pages/SignUp/steps'

function App() {

    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} >
                <Route index element={<Step1 />} />
                <Route path=":id" element={<Steps />} />
            </Route>
        </Routes>
    )
}

export default App
