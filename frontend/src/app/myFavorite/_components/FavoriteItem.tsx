import Image from "next/image";
type FavoriteProps ={
    title: String,
    author: String,
    image: String,
    price: Number,
}

export default function FavoriteItem({title, author, image, price}:FavoriteProps){
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
    alert(title)
    return(
        <div className="border-b border-b-slate-200">
            <div className="flex justify-between items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5"> {/* product */}
                    <div className="w-48">
                        <Image
                            src = {svgToDataUrl(image?.toString())}
                            alt="book_pic"
                            width={200}
                            height={50}
                            className="max-h-48 min-h-48 bg-slate-100 rounded-md"
                        ></Image>
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                        <div className="flex flex-col gap-3">
                            <span className="font-bold text-md">Name: {title}</span>
                            <span className="text-red-500 text-sm font-semibold">Author: {author}</span>
                        </div>
                    </div>
                </div>
                <span className="text-center w-1/5 font-semibold text-md">${price?.toString()}</span>
                <button className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-md hover:bg-gray-200">Remove</button>
            </div>
        </div>
    )
}