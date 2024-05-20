"use client"
import { useRouter } from "next/navigation";
import CartItem from "./_components/CartItem";
export default function CartPage(){
    const router = useRouter();
    const handleCheckout = () =>{
        router.push("/cart/checkout");
    }
    return(
        <div className="flex shadow-md my-3">
            <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                    <h2 className="font-semibold text-2xl">3 Items</h2>
                </div>
                <div className="flex mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Quantity</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Price</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Total</h3>
                </div>
                <div>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </div>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase">Items 3</span>
                    <span className="font-semibold text-sm">590$</span>
                </div>
                <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - $10.00</option>
                    </select>
                </div>
                <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>$600</span>
                    </div>
                    <button onClick={handleCheckout} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-full">Checkout</button>
                </div>
            </div>

        </div>

    );
}