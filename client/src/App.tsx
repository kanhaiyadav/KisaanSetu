import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignInUp from './Pages/SignInUp'
import Step1 from './Pages/SignInUp/step1'
import Steps from './Pages/SignInUp/steps'
import { verify } from './redux/user/user.slice'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken, selectIsFarmer } from './redux/user/selectors'
import { toast } from "react-toastify";
import { signOut } from './redux/user/user.slice'
import Classifier from './components/Classifier'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import ProductCardSkeleton from './Pages/Farmer/ProductCardSkeleton'
import ErrorBoundary from './components/ErrorBoundary'
import MainLoader from './components/MainLoader'
import ChatbotScripts from './ChatBot'
import Basics from './components/AgoraBasics/AgoraBasics'
import { AppDispatch } from './redux/store'
import ErrorPage from './components/ErrorPage'

const Farmer = lazy(() => import('./Pages/Farmer'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Dashboard = lazy(() => import('./Pages/Farmer/Dashboard'));
const Products = lazy(() => import('./Pages/Farmer/Products'));
const Sales = lazy(() => import('./Pages/Sales/Sales'));
const Consumer = lazy(() => import('./Pages/Consumer'));
const DefaultPage = lazy(() => import('./Pages/Consumer/defaultPage'));
const ProductListingPage = lazy(() => import('./Pages/Consumer/ProductListingPage'));

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(selectToken);
    const isFarmer = useSelector(selectIsFarmer);

    useEffect(() => {
        if (token) {
            const promise = dispatch(verify(token)).unwrap();
            toast.promise(promise, {
                pending: 'Verifying...',
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
            <ErrorBoundary fallback={<ErrorPage/>}>
                <Suspense fallback={<MainLoader />}>
                    <Routes>
                        <Route path="/test" element={<Basics />} />
                        <Route path="/" element={<><LandingPage /><ChatbotScripts /></>} />
                        <Route path="/signup" element={token ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signup' />} >
                            <Route index element={<Step1 />} />
                            <Route path=":id" element={<Steps />} />
                        </Route>
                        <Route path="/signin" element={token ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signin' />} />
                        <Route path='/farmer' element={token ? <Farmer /> : <Navigate to={'/signin'} />}>
                            <Route index element={<Dashboard />} />
                            <Route path='products' element={<Suspense fallback={<ProductCardSkeleton cards={10} type={'farmer'} />}><Products /></Suspense>} />
                            <Route path='sales' element={<Sales />} />
                        </Route>
                        <Route path='/consumer' element={<Consumer />} >
                            <Route index element={<DefaultPage />} />
                            <Route path='products' element={<ProductListingPage />} />
                        </Route>
                        <Route path='/classify' element={<Classifier />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </SkeletonTheme>
    )
}

export default App
