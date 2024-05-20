"use client"

import EmailIcon from '@mui/icons-material/Email';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();

    const handleNextButton = () => {
        router.push("/login/congradulation");
    }
    return (
    <main className="flex min-h-screen border-2">
        <div className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center">
            <h1 className="text-6xl">Forgot Password</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <EmailIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Your Email"/>
            </div>
            
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" onClick={handleNextButton}>Next</button>
        </div>
    </main>
    )
}