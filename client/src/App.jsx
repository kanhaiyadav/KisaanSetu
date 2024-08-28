import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp.component'
import Step1 from './Pages/SignUp/Step1.component'
import Steps from './Pages/SignUp/steps'
import Farmer from './Pages/Farmer/Farmer.component'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Farmer/Dashboard'
import Products from './Pages/Farmer/Products'

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/signup" element={<SignUp />} >
                <Route index element={<Step1 />} />
                <Route path=":id" element={<Steps />} />
            </Route>
            <Route path='/farmer' element={<Farmer />}>
                <Route index element={<Dashboard />} />
                <Route path='products' element={<Products />} />
            </Route>
        </Routes>
    )
}

export default App
