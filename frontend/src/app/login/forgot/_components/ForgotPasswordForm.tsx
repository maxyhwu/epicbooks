"use client"

import useUsers from '@/hooks/useUsers';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordForm() {
    const router = useRouter();
    const { forgotPassword } = useUsers();
    const [email, setEmail] =useState<string>("");
    const [name, setName] =useState<string>("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const valid = await forgotPassword(name, email);
        if (valid) {
            router.push("/login/congradulation");
        }
        else {
            alert("THe username and email do not match. Please try again!");
            setEmail("");
            setName("");
        }
        
    }

    return (
        <form className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center" onSubmit={handleSubmit}>
            <h1 className="text-6xl">Forgot Password</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <PersonIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <EmailIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" type='submit'>Next</button>
        </form>

    );
}