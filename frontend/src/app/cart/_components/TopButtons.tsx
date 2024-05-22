"use client"
import { useRouter } from "next/navigation";
export default function TopButton(){
    const router = useRouter()
    const handleBackToCart = () => {
        router.push("./")
    }
    const handleConfirm = () => {
        router.push("./success")
    }
    return(
        <>
        <button onClick={handleBackToCart} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-1/5 h-3/5">Back</button>
        <div className="flex flex-col items-center gap-2 mb-1 w-1/3">
            <p className="text-4xl">Checkout</p>
            <p>your order</p>
        </div>
        <button onClick={handleConfirm} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-1/5 h-3/5">Confirm Checkout</button>
        </>
    );
}