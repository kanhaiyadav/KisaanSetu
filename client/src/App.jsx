import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignInUp from './Pages/SignInUp'
import Step1 from './Pages/SignInUp/step1'
import Steps from './Pages/SignInUp/steps'
import Farmer from './Pages/Farmer'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Farmer/Dashboard'
import Products from './Pages/Farmer/Products'
import { verify } from './redux/user/user.slice'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken, selectIsFarmer } from './redux/user/selectors'
import { toast } from "react-toastify";
import { signOut } from './redux/user/user.slice'
import Sales from './Pages/Sales/Sales'
import Consumer from './Pages/Consumer'
import DefaultPage from './Pages/Consumer/defaultPage'
import ProductListingPage from './Pages/Consumer/ProductListingPage'
import Classifier from './componenets/Classifier'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const isFarmer = useSelector(selectIsFarmer);
    
    useEffect(() => {
        if (token) {
            const promise = dispatch(verify(token)).unwrap();
            toast.promise(promise, {
                loading: 'Verifying...',
                error: {
                    render({ data }) {
                        dispatch(signOut());
                        return data.message;
                    }
                }
            });
        }
    }, [dispatch, token]);
    return (
        <SkeletonTheme baseColor='#edf2f7' highlightColor="#f7fafc">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={token ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signup' />} >
                    <Route index element={<Step1 />} />
                    <Route path=":id" element={<Steps />} />
                </Route>
                <Route path="/signin" element={token ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signin' />} />
                <Route path='/farmer' element={token ? <Farmer /> : <Navigate to={'/signin'} />}>
                    <Route index element={<Dashboard />} />
                    <Route path='products' element={<Products />} />
                    <Route path='sales' element={<Sales />} />
                </Route>
                <Route path='/consumer' element={<Consumer />} >
                    <Route index element={<DefaultPage />} />
                    <Route path='products' element={<ProductListingPage />} />
                </Route>
                <Route path='/classify' element={<Classifier />} />
            </Routes>
        </SkeletonTheme>
    )
}

export default App
