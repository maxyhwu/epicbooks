import Image from "next/image"
import TopButton from "../_components/TopButtons"
export default function CheckoutPage(){
    // const router = useRouter()
    // const handleBacktoCart = () =>{
    //     router.push("./cart")
    // }
    return(
        <div>
            <div className="m-10 flex flex-col items-center px-5 gap-5">
                <div className="flex flex-row justify-between w-full items-center">
                    <TopButton/>
                    {/* <div className="flex justify-between">
                        <button className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-full">Back</button>
                        <button className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-full">Confirm Checkout</button>
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-1 w-1/3">
                        <p className="text-4xl">Checkout</p>
                        <p>your order</p>
                    </div> */}
                </div>
                <div className="w-full bg-gray-300 flex flex-row px-10 py-4 gap-8">
                    <div className="flex flex-row gap-8 w-1/2">
                        <Image
                        // src={`${productDetails[0].imageLink}`}
                        src = {"/story.jpg"}  
                        alt="book_pic"
                        width={200}
                        height={50}
                        className="max-h-28 min-h-28 max-w-36 min-w-36 border border-black rounded-md"
                        ></Image>
                        <div className="flex flex-col">
                            <p>Title: </p>
                            <p>Author:</p>
                        </div>
                    </div>
                    <div className="flex flex-row w-1/2 justify-between py-5 px-20 items-center">
                        <p>X1</p>
                        <p>380 NTD</p>
                    </div>
                </div>
                <div className="w-full bg-gray-300 flex flex-row px-10 py-4 gap-8">
                    <div className="flex flex-row gap-8 w-1/2">
                        <Image
                        // src={`${productDetails[0].imageLink}`}
                        src = {"/story.jpg"}  
                        alt="book_pic"
                        width={200}
                        height={50}
                        className="max-h-28 min-h-28 max-w-36 min-w-36 border border-black rounded-md"
                        ></Image>
                        <div className="flex flex-col">
                            <p>Title: </p>
                            <p>Author:</p>
                        </div>
                    </div>
                    <div className="flex flex-row w-1/2 justify-between py-5 px-20 items-center">
                        <p>X1</p>
                        <p>380 NTD</p>
                    </div>
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
