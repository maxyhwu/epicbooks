"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function CartButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const bookId = searchParams.get("bookId") ?? "";
  const params = new URLSearchParams(searchParams);
  
  const handleOnClick = () =>{
    if(!username){
      alert("Please login first")
      router.push("/login");
      return;
    }
    params.set("username", username);
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/cart/?${params.toString()}`);
}
  return (
    <div className="flex justify-center items-center bg-yellow-200 rounded-lg p-1.5">
      <p className="text-base text-center ml-2">My Cart</p>
      <IconButton onClick={handleOnClick} className="hover:text-lime-700">
        <ShoppingCartIcon />
      </IconButton>
    </div>
  );
}
