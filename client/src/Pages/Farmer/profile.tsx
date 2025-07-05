import React from 'react'
import { ImageUp } from 'lucide-react'

const profile = () => {
    return (
        <div className='h-full w-full p-[50px] px-[100px]'>
            <div className='w-full h-full flex gap-[100px]'>
                <div className='flex-1'>
                    <div className='bg-primary/10 border-2 border-dashed border-primary rounded-3xl w-full h-[250px] flex items-center justify-center'>
                        <img src="/placeholder.png" alt="" className='w-[100px] h-[100px] opacity-60' />
                    </div>
                </div>
                <div className='w-[300px]'>
                    <div className='bg-red-500/10 border-2 border-dashed border-primary rounded-full w-[220px] h-[220px] flex items-center justify-center'>
                        <img src="/placeholder.png" alt="" className='w-[100px] h-[100px] opacity-60' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile
