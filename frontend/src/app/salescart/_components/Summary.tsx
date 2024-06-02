"use client"
import { useRouter, useSearchParams } from "next/navigation";
type SummaryProps = {
    bookId: Number;
    quantity: Number;
    price: Number;
    title: String;
}
type Pageprops={
    summaries: SummaryProps[];
    username: string;
}
export default function Summary({summaries, username}:Pageprops){
    const router = useRouter();
    const searchParams = useSearchParams();
    // const username = searchParams.get("username") ?? "";
    const params = new URLSearchParams(searchParams);
    const handleCheckout = async() => {
        params.set("username", username)
        router.push(`/salescart/checkout/?${params.toString()}`);
    }
    let eachCost: number[] = [];
    let totalCost: number= 0
    summaries.forEach((summary, index) =>{
        totalCost += Number(summary.price)*Number(summary.quantity)
        eachCost[index] = Number(summary.price)*Number(summary.quantity)
    })
    return(
        <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Sale Summary</h1>
                {   
                    summaries.map((summary, index) => (
                        <div className="flex justify-between mt-10 mb-5 overscroll-contain">
                            <span className="font-semibold text-sm uppercase">{summary.title}</span>
                            <span className="font-semibold text-sm"> ${eachCost[index].toString()}</span>
                        </div>
                    ))
                }   
                {/* <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - $10.00</option>
                    </select>
                </div> */}
                <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total</span>
                        <span>${totalCost}</span>
                    </div>
                    <button onClick={handleCheckout} className="bg-buttons font-semibold hover:bg-gray-100 border border-black rounded-md py-3 text-sm text-black uppercase w-full">Sell</button>
                </div>
            </div>
    )
}