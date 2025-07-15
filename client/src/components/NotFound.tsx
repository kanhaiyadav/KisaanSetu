import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import Logo from './Logo'

const NotFound = () => {
    return (
        <div className='w-full h-full bg-white flex flex-col items-center justify-center relative m-4'>
            <div className='absolute top-0 left-0'>
                <Logo />
            </div>
            <DotLottieReact
                src='/lottie/404.lottie'
                autoplay
                loop
                style={{ width: '800px', height: '350px' }}
            />
            <div className='text-center'>
                <h1 className='text-4xl font-bold text-gray-800'>Page Not Found</h1>
                <p className='text-lg text-gray-600 mt-2'>The page you are looking for does not exist.</p>
            </div>
        </div>
    )
}

export default NotFound