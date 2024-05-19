"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function CartButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("mode", "buyer"!);
  const handleOnClick = () => {
    router.push("/cart");
  };
  return (
    <div className="flex justify-center items-center bg-yellow-200 rounded-lg p-1.5">
      <p className="text-base text-center ml-2">My Cart</p>
      <IconButton onClick={handleOnClick} className="hover:text-lime-700">
        <ShoppingCartIcon />
      </IconButton>
    </div>
  );
}
