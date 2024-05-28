"use client"
import { booksType } from "@/lib/types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FavButton from "./FavButton";

export default function BookDetail(
{   id, 
    price, 
    title, 
    sales, 
    author, 
    publisher, 
    publishDate, 
    genre, 
    language,
    image, 
    description}:booksType
){
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [isFav, setIsFav] = useState(false);
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
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (parseInt(inputValue) <= 1) {
            setBuyQuantity(1);
        }
        else {
            setBuyQuantity(parseInt(inputValue));
        }
    }
    const handleAddToCart = () =>{

    }
    const handleFav = () =>{
        setIsFav(!isFav);
        alert(isFav ? "Book removed from My Favorite" : "Book added to My Favorite");
    }

    return(
    <div className="flex flex-row w-full h-full justify-center p-10">
        <div className="flex flex-col gap-5">
            <Image
              src = {svgToDataUrl(image.toString())}
              alt="book_pic"
              width={500}
              height={300}
              className="border border-black rounded-md p-0.5 bg-white"
            ></Image>
            <div className="flex gap-2 w-full justify-center">
                {genre.map((g) => 
                    (<p className="text-3xl text-center font-bold">#{g}</p>)
                )}
            </div>
        </div>
        <div className="ml-16 w-1/2">
            <div>
                <p className="text-4xl mb-1">Title: {title}</p>
                <p className="text-4xl mb-1">Price: {price?.toString()} NTD</p>
                <p className="text-4xl mb-1">Author: {author}</p>
                <p className="text-2xl mb-1">Publisher: {publisher}</p>
                <p className="text-2xl mb-1">Published Date: {publishDate.toString().substring(0,10)} </p>
                <p className="text-2xl mb-2">Language: {language}</p>
                <div className="block h-64 w-[650px] p-2 bg-white border border-gray-200 rounded-lg shadow bg-white dark:border-gray-700 text-lg">
                    Description: {description}
                </div>
            </div>
            <div className="flex flex-row mt-3 gap-5">
                <div onClick={handleFav} className="flex justify-center item-center border border-black bg-white rounded-md p-0.5 w-25 h-25">
                    <FavButton isFav={isFav} bookId={id}/>
                </div>
                <input type='number' value={buyQuantity} className='w-12 border ml-1 rounded-md text-center border border-black' onChange={handleOnChange}></input>
                <button onClick={handleAddToCart} className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-lg">Add To My Cart</button>
                <p className="mt-5"> {sales?.toString()} people had bought it</p>
            </div>
        </div>
    </div>
    )
}