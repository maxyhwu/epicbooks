"use client"

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const [visiblity, setVisibility] = useState(false);
    const router = useRouter();
    const handleEnableVisiblity = () => {
        setVisibility(true);
    }

    const handleDisableVisiblity = () => {
        setVisibility(false);
    }

    const handleRegister = () => {
        router.push("/register");
    }

    const handleForgotPassword = () => {
        router.push("/login/forgot");
    }

    return (
    <main className="flex min-h-screen border-2">
        <div className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center">
            <h1 className="text-6xl">Login</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <EmailIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Email"/>
            </div>

            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <LockIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input type={visiblity ? 'text':'password'} className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Password"/>
                {visiblity ?
                <IconButton onClick={handleDisableVisiblity}>
                    <VisibilityOffIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton> : 
                <IconButton onClick={handleEnableVisiblity}>
                    <VisibilityIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton>}
            </div>
            <button className='w-full text-right mt-2 underline' onClick={handleForgotPassword}>Forgot Password</button>
            
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons">Login</button>
            <div className="flex gap-2 mt-5">
                <p>Do not have an account?</p>
                <button className="text-blue-700 hover:underline" onClick={handleRegister}>Register now</button>
            </div>
        </div>
    </main>
    )
}