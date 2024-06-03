"use client"
import useCarts from "@/hooks/useCart";
import { useRouter } from "next/navigation";

type Pageprops = {
    username: string,
    quantity: number,
    bookId: number,
}
export default function ChangeQuantity({quantity, username, bookId}: Pageprops){
    // const [newQuantity, setNewQuantity] = useState()
    const router = useRouter();
    const {addToSalesCart} = useCarts()
    const handleRemoveItem = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        await addToSalesCart(username.toString(), bookId, -1);
        router.refresh();
    }
    const handleAddItem = async(e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        await addToSalesCart(username.toString(), bookId, 1);
        router.refresh();
    }
    return(
        <div className="flex justify-center w-1/5">
            <button onClick={(e) => handleRemoveItem(e)}>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
            </button>
            <input className="mx-2 border text-center w-8" type="text" value={Number(quantity)} />
            <button onClick={(e) => handleAddItem(e)}>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
            </button>
        </div>
    )
}