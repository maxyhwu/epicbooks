import useBooks from "@/hooks/useBook";
import Image from "next/image";
import ChangeQuantity from "./ChangeQuantity";
import RemoveButton from "./RemoveButton";
type CartProps ={
    bookId: Number;
    quantity: Number;
    username: string;
}

export default async function CartItem({ bookId, quantity, username }:CartProps){
    const { getBookInfo } = useBooks();
    const bookInfo = await getBookInfo(Number(bookId));
    let eachTotal = 0;
    eachTotal = Number(bookInfo?.price)*Number(quantity)*0.8;
    const svgToDataUrl = (svgString: string): string => {
        // Decode Unicode-escaped characters
        const decodedSvgString = svgString.replace(/\\u([\dA-F]{4})/gi, (_, group) =>
          String.fromCharCode(parseInt(group, 16))
        );
        // Convert to base64
        const base64Svg = btoa(decodedSvgString);
        // Create data URL
        return `data:image/svg+xml;base64,${base64Svg}`;
    };

    return(
        <div className="border-b border-b-slate-200">
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5"> {/* product */}
                    <div className="w-48">
                        <Image
                            src = {svgToDataUrl(bookInfo?.image?.toString() ?? "")}
                            alt="book_pic"
                            width={200}
                            height={50}
                            className="max-h-48 min-h-48 min-w-48 max-w-48 bg-slate-100 rounded-md"
                        ></Image>
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                        <div className="flex flex-col">
                            <span className="font-bold text-md">Name: {bookInfo?.title}</span>
                            <span className="text-red-500 text-sm font-semibold">Author: {bookInfo?.author}</span>
                        </div>
                        <RemoveButton username={username} bookId={bookId}/>
                    </div>
                </div>
                <ChangeQuantity quantity={quantity} bookId={bookId} username={username}/>
                <span className="text-center w-1/5 font-semibold text-sm">${(Number(bookInfo?.price)*0.8).toString()}</span>
                <span className="text-center w-1/5 font-semibold text-sm">${eachTotal.toString()}</span>
            </div>
        </div>
    )
}