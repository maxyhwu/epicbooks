"use client"

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const handleHome = () => {
        router.push("/");
    }
    

    return (
    <main className="flex min-h-screen border-2">
        <div className="flex flex-col w-1/2 rounded-lg mx-auto justify-center items-center">
            <h1 className="text-6xl">Congratulation!</h1>
            <div className='flex w-full justify-start border border-black rounded-lg mt-16 break-all py-16 px-10 text-center text-xl'>
                We have sent an mail to your e-mail account to help you reset the password. Please reset the password via the link in the mail within 2 days.
            </div>
            
            <button className="mt-10 px-4 py-2 text-2xl rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" onClick={handleHome}>Back to home</button>
        </div>
    </main>
    )
}
