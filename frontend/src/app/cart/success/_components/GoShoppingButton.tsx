"use client"
import { useRouter, useSearchParams } from "next/navigation";
type GoShoppingButtonProps={
    username: string;
}
export default function GoShoppingButton({username}: GoShoppingButtonProps){
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const handleGoShopping = () =>{
        params.set("username", username);
        router.push(`/?${params.toString()}`);
    }
    return(
        <button onClick={handleGoShopping} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md text-sm text-black uppercase p-3">Go shopping</button>
    );
}