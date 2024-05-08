"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import GetSerachName from "./GetSearchName";
import SignOutButton from "./SignOutButton";

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
 
  return (
    <div className="flex w-full justify-between border border-b-black bg-custom px-8 py-8">
      <div className="flex items-end gap-10">
          <button
          onClick={handleHome}
          className="flex gap-2">
            <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20} />
            <p className="ml-2 text-4xl font-semibold text-black">ePicBook</p>
          </button>
        {/* <p className="ml-10 tracking-wider text-black">
          Welcome, {session.data?.user?.name}!
        </p> */}
        <GetSerachName/>
      </div>
     
      <div className="flex gap-8">
        <button className="text-lg underline" onClick={handleHome}>Home</button>
        <button className="text-lg underline">New Arrival</button>
        <button className="text-lg underline">Best Sellings</button>
        <button className="text-lg underline">Recommendation</button>
        <SignOutButton />
      </div>
    </div>
  );
}
