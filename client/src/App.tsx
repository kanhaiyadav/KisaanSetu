import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignInUp from './Pages/SignInUp'
import Step1 from './Pages/SignInUp/step1'
import { useSelector } from "react-redux";
import { selectIsFarmer } from './redux/user/selectors'
import { toast } from "react-toastify";
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
import AgoraChat from './components/AgoraChat'
import { useAuth } from './contexts/authContext'
import ProfilePage from './Pages/Farmer/profile2'
import GeminiImageClassifier from './components/ImageClassifier'
import NotFound from './components/NotFound'
import { io } from "socket.io-client";

const Farmer = lazy(() => import('./Pages/Farmer'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Dashboard = lazy(() => import('./Pages/Farmer/Dashboard'));
const Products = lazy(() => import('./Pages/Farmer/Products'));
const Sales = lazy(() => import('./Pages/Sales/Sales'));
const Consumer = lazy(() => import('./Pages/Consumer'));
const DefaultPage = lazy(() => import('./Pages/Consumer/DefaultPage'));
const ProductListingPage = lazy(() => import('./Pages/Consumer/ProductListingPage'));
const SignUpPage = lazy(() => import('@/components/RegisterForm'));
const RealProfilePage = lazy(() => import('@/Pages/Farmer/profile'));

function App() {
    const { currentUser } = useAuth()
    const isFarmer = useSelector(selectIsFarmer);
    console.log("***************", isFarmer, "***************");

    useEffect(() => {
        if (currentUser) {
            // Initialize Socket.IO connection
            const socket = io("http://localhost:3000", {
                transports: ['websocket'],
                withCredentials: true,
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from Socket.IO server");
            });

            socket.on("connect_error", (err) => {
                console.error("Socket.IO connection error:", err);
                toast.error("Socket.IO connection error. Please try again later.");
            });

            return () => {
                socket.disconnect();
            };
        }

    }, [currentUser])

    return (
        <SkeletonTheme baseColor='#edf2f7' highlightColor="#f7fafc">
            <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<MainLoader />}>
                    <Routes>
                        <Route path="/test" element={<Basics />} />
                        <Route path="/agora-chat" element={<AgoraChat />} />
                        <Route path="/" element={<><LandingPage /><ChatbotScripts /></>} />
                        <Route path="/classify-gemini" element={<GeminiImageClassifier />} />
                        <Route path="/signup" element={currentUser ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signup' />} >
                            <Route index element={<Step1 />} />
                            <Route path="register" element={<SignUpPage />} />
                        </Route>
                        <Route path="/signin" element={currentUser ? <Navigate to={isFarmer ? '/farmer' : '/consumer'} /> : <SignInUp type='signin' />} />
                        <Route path='/farmer' element={currentUser ? <Farmer /> : <Navigate to={'/signin'} />}>
                            <Route index element={<Dashboard />} />
                            <Route path='products' element={<Suspense fallback={<ProductCardSkeleton cards={10} type={'farmer'} />}><Products /></Suspense>} />
                            <Route path='sales' element={<Sales />} />
                            <Route path='profile' element={<RealProfilePage />} />
                            <Route path='profile2' element={<ProfilePage />} />
                        </Route>
                        <Route path='/consumer' element={<Consumer />} >
                            <Route index element={<DefaultPage />} />
                            <Route path='products' element={<ProductListingPage />} />
                        </Route>
                        <Route path='/classify' element={<Classifier />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </SkeletonTheme>
    )
}

export default App
