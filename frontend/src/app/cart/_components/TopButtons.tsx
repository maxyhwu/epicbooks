"use client"
import useCarts from "@/hooks/useCart";
import { cartItem } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

type ConfirmProps = {
    cartItems: cartItem[];
}

export default function TopButton({cartItems}: ConfirmProps){
    const router = useRouter()
    const {clearCart} = useCarts()
    const searchParams = useSearchParams();
    const username = searchParams.get("username") ?? "";
    const params = new URLSearchParams(searchParams);
    const handleBackToCart = () => {
        params.set("username", username);
        router.push(`./?${params.toString()}`)
    }
    const handleConfirm = async() => {
        try {
            const resp = await clearCart(username)
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
            <p className="text-4xl">Checkout</p>
            <p>your order</p>
        </div>
        <button onClick={handleConfirm} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-1/5 h-3/5">Confirm Checkout</button>
        </>
    );
}