import Image from "next/image";

type CheckoutItemProps = {
    title: string;
    author: string;
    quantity: Number;
    price: Number;
    image: String;
}

export default async function CheckoutItem({ title, author, quantity, price, image }:CheckoutItemProps){
    let eachTotal = 0;
    eachTotal = Number(price)*Number(quantity)
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
        <div className="w-full bg-gray-200 flex flex-row px-10 py-4 gap-8">
            <div className="flex flex-row gap-8 w-1/2">
                <Image
                src = {svgToDataUrl(image.toString())}  
                alt="book_pic"
                width={200}
                height={50}
                className="max-h-28 min-h-28 max-w-36 min-w-36 border border-black rounded-md"
                ></Image>
                <div className="flex flex-col">
                    <p>Title: {title}</p>
                    <p>Author: {author}</p>
                </div>
            </div>
            <div className="flex flex-row w-1/2 justify-between py-5 px-20 items-center">
                <p>X{quantity.toString()}</p>
                <p>{eachTotal} NTD</p>
            </div>
        </div>
    )
}