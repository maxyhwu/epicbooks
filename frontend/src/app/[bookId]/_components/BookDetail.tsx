"use client"
import useCarts from '@/hooks/useCart';
import { booksType } from "@/lib/types";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import FavIcon from './FavoriteIcon';

type BookDetailProps ={
    username: string,
    isFav: boolean,
}

type combinedType = BookDetailProps & booksType;

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
    description,
    isFav, 
    username,
}:combinedType, 
){
    const [buyQuantity, setBuyQuantity] = useState(1);
    const router = useRouter();

    const {addFavorite, addToCart} = useCarts();
    const svgToDataUrl = (svgString: string): string => {
        // Decode Unicode-escaped characters
        const decodedSvgString = svgString?.replace(/\\u([\dA-F]{4})/gi, (_, group) =>
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
    const handleAddToCart =async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        if (!username){
            alert("Please login first")
            router.push("/login");
            router.refresh();
            return;
        }
        const resp = await addToCart(username, id, buyQuantity);
        alert(resp);
        router.refresh()
    }
    const handleFav = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        e.preventDefault();
        if (!username){
           alert("Please login first")
           router.push("/login");
           router.refresh();
           return;
        }
        const resp = await addFavorite(username, id);
        alert(resp)
        router.refresh();
    }

    return(
    <div className="flex flex-row w-full h-full justify-center p-10">
        <div className="flex flex-col gap-5">
            <Image
              src = {svgToDataUrl(image?.toString())}
              alt="book_pic"
              width={500}
              height={300}
              className="border border-black rounded-md p-0.5 bg-white"
            ></Image>
            <div className="flex gap-2 w-full justify-center">
                {genre?.map((g, i) => 
                    (<p className="text-3xl text-center font-bold" key={i}>#{g}</p>)
                )}
            </div>
        </div>
        <div className="ml-16 w-1/2">
            <div>
                <p className="text-4xl mb-1">Title: {title}</p>
                <p className="text-4xl mb-1">Price: {price?.toString()} NTD</p>
                <p className="text-4xl mb-1">Author: {author}</p>
                <p className="text-2xl mb-1">Publisher: {publisher}</p>
                <p className="text-2xl mb-1">Published Date: {publishDate?.toString().substring(0,10)} </p>
                <p className="text-2xl mb-2">Language: {language}</p>
                <div className="block h-64 w-[650px] p-2 border border-gray-200 rounded-lg shadow bg-white dark:border-gray-700 text-lg">
                    Description: {description}
                </div>
            </div>
            <div className="flex flex-row mt-3 gap-5">
                <div onClick={(e)=>handleFav(e)} className="flex justify-center item-center border border-black bg-white rounded-md p-0.5 w-25 h-25">
                    <IconButton className="hover:text-lime-700">
                        <FavIcon isFav={isFav ?? false}/>
                    </IconButton>
                </div>
                <input type='number' value={buyQuantity} className='w-12 ml-1 rounded-md text-center border border-black' onChange={handleOnChange}></input>
                <button onClick={(e) => handleAddToCart(e)} className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-lg hover:bg-gray-200">Add To My Cart</button>
                <p className="mt-5"> {sales?.toString()} people had bought it</p>
            </div>
        </div>
    </div>
    )
}