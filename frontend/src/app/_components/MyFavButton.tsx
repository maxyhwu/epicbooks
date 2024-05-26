"use client";

import { useRouter, useSearchParams } from "next/navigation";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";


export default function MyFavButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set("mode", "buyer"!);
  const handleOnClick = () => {
    router.push(`/myFavorite`);
  };
  
  return (
    <div className="flex justify-center items-center bg-yellow-200 rounded-lg p-1.5">
      <p className="text-base text-center ml-2">My Fav.</p>
      <IconButton onClick={handleOnClick} className="hover:text-lime-700">
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  );
}
