"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function SaleButton() {
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
    router.push(`/salescart/?${params.toString()}`);
}
  return (
    <button className="flex justify-center items-center bg-yellow-200 rounded-lg px-4 py-2.5 hover:bg-gray-200" onClick={handleOnClick}>
      <p className="text-base text-center ml-2">My Sale</p>
      <ShoppingCartIcon className="ml-2"/>
    </button>
  );
}
