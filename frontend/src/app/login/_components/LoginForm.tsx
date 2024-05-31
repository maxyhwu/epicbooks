"use client"
import useUsers from '@/hooks/useUsers';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const [visiblity, setVisibility] = useState(false);
    const [email, setEmail] =useState<string>("");
    const [password, setPassword] =useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { Login } = useUsers();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "") {
            alert("請輸入帳號！");
            return;
        }
        
        if (password.length < 8) {
            alert("密碼長度至少須為8碼以上！");
            return;
        }

        try {
            const result = await Login(email, password);
            if (result) {
                alert("Login success!");
                const params = new URLSearchParams(searchParams);
                params.set("username", result.username as string);
                router.push(`/?${params.toString()}`);
            }
            else {
                alert("Login failed, the email or the password may be wrong. Please try again!");
                setEmail("");
                setPassword("");
            }
        }catch(error){
            console.log(error);
            return;
        }

    }

    return (
        <>
            <form className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center" onSubmit={handleSubmit}>
                <h1 className="text-6xl">Login</h1>
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
                <button className='w-full text-right mt-2 underline' onClick={handleForgotPassword}>Forgot Password</button>
                
                <button type="submit" className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons">Login</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Do not have an account?</p>
                <button className="text-blue-700 hover:underline" onClick={handleRegister}>Register now</button>
            </div>
        </>
    );
}