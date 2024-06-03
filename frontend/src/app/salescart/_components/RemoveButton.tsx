"use client"

import useCarts from "@/hooks/useCart";
import { useRouter } from "next/navigation";
type removeButtonProps = {
    bookId: number;
    username: string;
}
export default function RemoveButton( { bookId, username }: removeButtonProps ) {
    const { removeFromSalesCart } = useCarts();
    const router = useRouter();

    const handleRemove = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await removeFromSalesCart(username, bookId);
        router.refresh();
    }

    return (
        <button className="w-max border border-black text-left rounded-md py-1 px-2 h-25 text-md hover:bg-gray-200" onClick={(e) => handleRemove(e)}>Remove</button>
    );
}