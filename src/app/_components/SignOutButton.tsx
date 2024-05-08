"use client";

import { publicEnv } from "@/lib/env/public";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignOutButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignOut = async() => {
    if (session) {
      await signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    }
    router.push("/");
  }
  return <button className="px-4 rounded-md border border-black hover:bg-slate-200 hover:shadow-2xl bg-buttons" onClick={handleSignOut}>Sign Out</button>;
}
