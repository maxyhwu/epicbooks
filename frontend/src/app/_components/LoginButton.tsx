"use client";

// import { publicEnv } from "@/lib/env/public";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginButton() {
  const router = useRouter();
  // const { data: session } = useSession();
  const handleSignIn = async() => {
    router.push("/login");
  }
  return <button className="px-4 rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" onClick={handleSignIn}>Login</button>;
}
