import Image from "next/image"
export default function CheckoutPage(){
    return(
        <div>
            <div className="m-10 flex flex-col items-center px-5">
                <div className="flex flex-col items-center gap-2 mb-3">
                    <p className="text-4xl">Checkout</p>
                    <p>your order</p>
                </div>
                <div className="w-full bg-gray-300 flex flex-row px-10 py-4 gap-8">
                    <Image
                    // src={`${productDetails[0].imageLink}`}
                    src = {"/story.jpg"}  
                    alt="book_pic"
                    width={200}
                    height={50}
                    className="max-h-28 min-h-28 max-w-36 min-w-36 border border-black rounded-md"
                    ></Image>
                    <p>Wi</p>
                </div>
            </div>
            <div className="m-10 flex flex-col items-center px-5 gap-5">
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Delivery: Family Mart</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Note:</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Total:</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Payment Method:</p>
                </div>
            </div>
        </div>
        
    )
}
