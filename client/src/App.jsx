import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignInUp from './Pages/SignInUp'
import Step1 from './Pages/SignInUp/step1'
import Steps from './Pages/SignInUp/steps'
import Farmer from './Pages/Farmer'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Farmer/Dashboard'
import Products from './Pages/Farmer/Products'

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="/signup" element={<SignInUp type='signup'/>} >
                <Route index element={<Step1 />} />
                <Route path=":id" element={<Steps />} />
            </Route>
            <Route path="/signin" element={<SignInUp type='signin'/>} />
            <Route path='/farmer' element={<Farmer />}>
                <Route index element={<Dashboard />} />
                <Route path='products' element={<Products />} />
            </Route>
        </Routes>
    )
}

export default App
