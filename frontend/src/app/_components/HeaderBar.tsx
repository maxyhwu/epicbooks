"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import GetSerachName from "./GetSearchName";
import LoginButton from "./LoginButton";

export default function HeaderBar() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const handleMainPage = () => {
  //   const params = new URLSearchParams(searchParams);
  //   // params.set("mode", "buyer"!);
  //   router.push("");
  // }
  const handleHome = () =>{
    router.push("/");
  }
  const handleNewArrival = () =>{
    router.push("/newArrival")
  }
  const handleBestSelling = () =>{
    router.push("/bestselling")
  }
  const handleRecommmendation = () =>{
    router.push("/recommendation")
  }
 
  return (
    <div className="flex w-full justify-between border border-b-black bg-custom px-8 py-8">
      <div className="flex items-end gap-10">
          <button
          onClick={handleHome}
          className="flex gap-0.5 items-center justify-center align-center">
            <Image src="/story_book.ico" alt="IMazon icon" width={45} height={25} />
            <p className="ml-2 text-4xl font-semibold text-black">ePicBook</p>
          </button>
        {/* <p className="ml-10 tracking-wider text-black">
          Welcome, {session.data?.user?.name}!
        </p> */}
        <GetSerachName/>
      </div>
     
      <div className="flex gap-8">
        <button className="text-lg underline" onClick={handleHome}>Home</button>
        <button className="text-lg underline" onClick={handleNewArrival}>New Arrival</button>
        <button className="text-lg underline" onClick={handleBestSelling}>Best Sellings</button>
        <button className="text-lg underline" onClick={handleRecommmendation}>Recommendation</button>
        <LoginButton />
      </div>
    </div>
  );
}
