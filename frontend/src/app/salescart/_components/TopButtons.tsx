"use client"
import useCarts from "@/hooks/useCart";
import { useRouter, useSearchParams } from "next/navigation";


export default function TopButton(){
    const router = useRouter()
    const {clearSalesCart} = useCarts()
    const searchParams = useSearchParams();
    const username = searchParams.get("username") ?? "";
    const params = new URLSearchParams(searchParams);
    const handleBackToCart = () => {
        params.set("username", username);
        router.push(`./?${params.toString()}`)
    }
    const handleConfirm = async() => {
        try {
            const resp = await clearSalesCart(username)
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
        params.set("username", username);
        router.push(`./success/?${params.toString()}`)
        router.refresh()
    }
    return(
        <>
        <button onClick={handleBackToCart} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-1/5 h-3/5">Back</button>
        <div className="flex flex-col items-center gap-2 mb-1 w-1/3">
            <p className="text-4xl">confirm sell</p>
            <p>your sale</p>
        </div>
        <button onClick={handleConfirm} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-1/5 h-3/5">Confirm Sell</button>
        </>
    );
}