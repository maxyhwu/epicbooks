"use client"

import useUsers from '@/hooks/useUsers';
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
    const [visiblity, setVisibility] = useState(false);
    const [confirmVisiblity, setConfirmVisibility] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { Register } = useUsers();
    
    
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

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "") {
            alert("請輸入帳號！");
            return;
        }

        if (name === "") {
            alert("請輸入名字！");
            return;
        }
    
        if (password.length < 8) {
            alert("密碼長度至少須為8碼以上！");
            return;
        }
    
        if(confirmPassword != password) {
            alert("密碼與確認密碼不相符！")
            return;
        }

        
        try {
            const newUser = await Register(password, email, name);
            alert(newUser)
            if (newUser === 'Register success') {
                alert("Register success!");
                const params = new URLSearchParams(searchParams);
                params.set("username", name!);
                router.push(`/?${params.toString()}`);
            }
            else {
                alert("Register failed, please try again!");
            }
        }catch(error){
            console.log(error);
        }

    }


    const handleLogin = () => {
        router.push("/login");
    }

    return (
        <>
        <form className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center" onSubmit={handleSubmit}>
            <h1 className="text-6xl">Register</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <PersonIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
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
                {password === confirmPassword && password.length >= 8 && <CheckIcon className='text-green-700 rounded-2xl my-auto'></CheckIcon>}
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
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" type='submit'>Register</button>
        </form>
        <div className="flex gap-2 mt-5">
            <p>Already have an account?</p>
            <button className="text-blue-700 hover:underline" onClick={handleLogin}>Click to login</button>
        </div>
        </>
    );

}