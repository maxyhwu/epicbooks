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
    const [confirmVisiblity, setConfirmVisibility] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();
    const handleEnableVisiblity = () => {
        setVisibility(true);
    }

    const handleDisableVisiblity = () => {
        setVisibility(false);
    }

    const handleEnableConfirmVisiblity = () => {
        setConfirmVisibility(true);
    }

    const handleDisableConfirmVisiblity = () => {
        setConfirmVisibility(false);
    }


    const handleLogin = () => {
        router.push("/login");
    }

    return (
    <main className="flex min-h-screen border-2">
        <div className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center">
            <h1 className="text-6xl">Register</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <EmailIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <LockIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input type={visiblity ? 'text':'password'} className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {visiblity ?
                <IconButton onClick={handleDisableVisiblity}>
                    <VisibilityOffIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton> : 
                <IconButton onClick={handleEnableVisiblity}>
                    <VisibilityIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton>}
            </div>
            {(password.length < 8 && password.length != 0) &&
                <p className='text-red-500 mt-2 text-sm text-end w-full'>The password length must be at least 8 characters.</p> 
            }

            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <LockIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input type={confirmVisiblity ? 'text':'password'} className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                {confirmVisiblity ?
                <IconButton onClick={handleDisableConfirmVisiblity}>
                    <VisibilityOffIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton> : 
                <IconButton onClick={handleEnableConfirmVisiblity}>
                    <VisibilityIcon fontSize='large' className='my-auto mx-2'/>
                </IconButton>}
            </div>
            {(password !== confirmPassword && confirmPassword.length >= password.length) &&
                <p className='text-red-500 mt-2 text-sm text-end w-full'>It is not the same with the password you filled.</p> 
            }
            
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons">Register</button>
            <div className="flex gap-2 mt-5">
                <p>Already have an account?</p>
                <button className="text-blue-700 hover:underline" onClick={handleLogin}>Click to login</button>
            </div>
        </div>
    </main>
    )
}