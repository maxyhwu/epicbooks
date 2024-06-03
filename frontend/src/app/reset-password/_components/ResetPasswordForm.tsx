"use client"

import useUsers from '@/hooks/useUsers';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordForm() {
    const [visiblity, setVisibility] = useState(false);
    const [confirmVisiblity, setConfirmVisibility] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { resetPassword } = useUsers();
    
    
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

        if (password.length < 8) {
            alert("密碼長度至少須為8碼以上！");
            return;
        }
    
        if(confirmPassword != password) {
            alert("密碼與確認密碼不相符！")
            return;
        }

        const token = params.get("token");
        if (!token) {
            alert("Token not found!");
            router.push("/");
            return;
        }
        try {
            const res = await resetPassword(token, password);
            if (res) {
                alert("Reset password success, and you can login with the new password!");
                router.push(`/`);
            }
            else {
                alert("Reset password failed, please try again!");
            }
        }catch(error){
            console.log(error);
        }

    }

    return (
        <>
        <form className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center" onSubmit={handleSubmit}>
            <h1 className="text-6xl">Reset Password</h1>
            
            <div className='flex w-full justify-start border border-black rounded-lg mt-16'>
                <LockIcon fontSize='large' className='my-auto mx-2 text-gray-700'/>
                <input type={visiblity ? 'text':'password'} className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
                <input type={confirmVisiblity ? 'text':'password'} className="px-4 py-2 text-2xl w-full rounded-lg" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" type='submit'>Reset</button>
        </form>
        </>
    );

}