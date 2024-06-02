"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import GetSerachName from "./GetSearchName";
import LoginButton from "./LoginButton";

export default function HeaderBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const bookId = searchParams.get("bookId") ?? "";
  const params = new URLSearchParams(searchParams);
  const handleHome = () =>{
    params.set("username", username);
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/?${params.toString()}`);
  }
  const handleNewArrival = () =>{
    params.set("username", username);
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/newArrival/?${params.toString()}`);
  }
  const handleBestSelling = () =>{
    params.set("username", username);
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/bestselling/?${params.toString()}`);
  }
  const handleRecommmendation = () =>{
    params.set("username", username);
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/recommendation/?${params.toString()}`);
  }

  const handleLogout = () => {
    params.set("username", "");
    if (bookId){
      params.delete("bookId");
    }
    router.push(`/?${params.toString()}`);
  }
 
  return (
    <div className="flex w-full justify-between border border-b-black bg-custom px-8 py-8">
      <div className="flex items-end gap-10">
          <button
          onClick={handleHome}
          className="flex gap-0.5 items-center justify-center align-center">
            <Image src="/story_book.ico" alt="IMazon icon" width={45} height={25} />
            <p className="ml-2 text-4xl font-semibold text-black">ePicBooks</p>
          </button>
        {/* <GetSerachName/> */}
      </div>
     
      <div className="flex gap-8">
        <button className="text-lg underline" onClick={handleHome}>Home</button>
        <button className="text-lg underline" onClick={handleNewArrival}>New Arrival</button>
        <button className="text-lg underline" onClick={handleBestSelling}>Best Sellings</button>
        <button className="text-lg underline" onClick={handleRecommmendation}>Recommendation</button>
        {username === "" ?  <LoginButton/> : 
        <div className="flex items-center gap-4">
          <p>Hi, {username}</p>
          <button onClick={handleLogout} className="px-4 py-2 border border-black  bg-gray-100 rounded-md hover:bg-gray-400">Logout</button>
        </div>}
      </div>
    </div>
  );
}
