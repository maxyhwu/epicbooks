"use client"
import { booksType } from "@/lib/types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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
    const router = useRouter()
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (parseInt(inputValue) <= 1) {
            setBuyQuantity(1);
        }
        else {
            setBuyQuantity(parseInt(inputValue));
        }
    }
    const handleFav = () =>{
        alert("Book is added to My Favorite")
    }

    return(
    <div className="flex flex-row w-full h-full justify-center p-10">
        <div className="flex flex-col gap-5">
            <Image
              src = {"/IMazon.ico"}
              alt="book_pic"
              width={500}
              height={300}
              className="border border-black rounded-md p-0.5 bg-white"
            ></Image>
            <p className="text-3xl text-center font-bold">###</p>
        </div>
        <div className="ml-16 w-1/2">
            <div>
                <p className="text-4xl mb-1">Title: {title}</p>
                <p className="text-4xl mb-1">Price: {price.toString()} NTD</p>
                <p className="text-4xl mb-1">Author: {author}</p>
                <p className="text-2xl mb-1">Publisher: {publisher}</p>
                <p className="text-2xl mb-1">Published Date: {publishDate.toTimeString()} </p>
                <p className="text-2xl mb-2">Language: {language}</p>
                <div className="block h-64 w-[650px] p-2 bg-white border border-gray-200 rounded-lg shadow bg-white dark:border-gray-700 text-lg">
                    Description: {description}
                </div>
            </div>
            <div className="flex flex-row mt-3 gap-5">
                <div className="flex justify-center item-center border border-black bg-white rounded-md p-0.5 w-25 h-25">
                    <IconButton onClick={handleFav} className="hover:text-lime-700">
                        <FavoriteBorderIcon />
                    </IconButton>
                </div>
                <input type='number' value={buyQuantity} className='w-12 border ml-1 rounded-md text-center border border-black' onChange={handleOnChange}></input>
                <button className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-lg">Add To My Cart</button>
                <p className="mt-5"> {sales.toString()} people had bought it</p>
            </div>
        </div>
    </div>
    )
}