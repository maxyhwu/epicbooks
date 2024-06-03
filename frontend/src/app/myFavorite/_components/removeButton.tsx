"use client"

import useCarts from "@/hooks/useCart";
import { useRouter } from "next/navigation";
type removeButtonProps = {
    bookId: number;
    username: string;
}
export default function RemoveButton( { bookId, username }: removeButtonProps ) {
    const { removeFavorite } = useCarts();
    const router = useRouter();

    const handleRemove = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await removeFavorite(username, bookId);
        router.refresh();
    }

    return (
        <button className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-md hover:bg-gray-200" onClick={(e) => handleRemove(e)}>Remove</button>
    );
}