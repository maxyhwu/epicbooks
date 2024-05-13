"use client"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import Image from "next/image";

export default function BookDetail(){
    const handleOnClick = () =>{

    }

    return(
    <div className="flex flex-row w-full h-full justify-center p-16">
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
                <p className="text-4xl mb-1">Title:</p>
                <p className="text-4xl mb-1">Price:</p>
                <p className="text-4xl mb-1">Author:</p>
                <p className="text-2xl mb-1">Publisher:</p>
                <p className="text-2xl mb-1">Published Date:</p>
                <p className="text-2xl mb-2">Language:</p>
                <div className="block h-64 w-[650px] p-2 bg-white border border-gray-200 rounded-lg shadow bg-white dark:border-gray-700 text-lg">
                    Description:   
                </div>
            </div>
            <div className="flex flex-row mt-3 gap-5">
                <div className="flex justify-center item-center border border-black bg-white rounded-md p-0.5 w-25 h-25">
                    <IconButton onClick={handleOnClick} className="hover:text-lime-700">
                    <FavoriteBorderIcon />
                    </IconButton>
                </div>
                <button className="text-center border border-black bg-white rounded-md py-1 px-6 h-25 text-lg">Add To My Cart</button>
                <p className="mt-5"> xxx people had bought it</p>
            </div>
        </div>
    </div>
    )
}