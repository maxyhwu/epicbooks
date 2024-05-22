"use client"
import { useRouter } from "next/navigation";
export default function GoShoppingButton(){
    const router = useRouter();
    const handleGoShopping = () =>{
        router.push("/");
    }
    return(
        <button onClick={handleGoShopping} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md text-sm text-black uppercase p-3">Go shopping</button>
    );
}