"use client"
import { publicEnv } from "@/lib/env/public";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { getProductDetails } from "../../warehouse/_components/action";


type RecomPreviewProps = {
  bookId: string;
  bookName: string;
  // mode: string;
};

export default function RecomPreview({
  bookId,
  bookName,
  // mode,
}: RecomPreviewProps) {
  // const productDetails = await getProductDetails(bookId);
  const router = useRouter();
  let minPrice = Infinity;
  let totalQuantity = 0;
  let totalSold = 0; 

  const handleOnClick = () => {
    // router.push(`/main/shop/cart?${params.toString()}`);
  };
  const handleDetail = () =>{
    router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/${bookId}`);
  }

  // for (let i = 0; i < productDetails.length; i++) {
  //   if (parseInt(productDetails[i].price) < minPrice) {
  //     minPrice = parseInt(productDetails[i].price);
  //   }
  //   totalQuantity += productDetails[i].quantity;
  //   totalSold += productDetails[i].sold ?? 0;
  // }
  return (
      <div className="relative"> 
        <StarIcon className="absolute -left-8 z-10 -top-8 h-16 w-16 text-yellow-400"></StarIcon>   
        <div className="relative max-h-full flex flex-row flex gap-5 justify-between w-full items-center rounded-md border border-black p-3 shadow-sm bg-custom">
          {/* <div className="flex gap-5"> */}
            <div className="flex flex-col gap-3 w-1/2">
              <Image
                // src={`${productDetails[0].imageLink}`}
                src = {"/IMazon.ico"}
                alt="book_pic"
                width={200}
                height={50}
                className="max-h-48 min-h-48 border border-black rounded-md p-0.5 bg-white"
              ></Image>
              <div className="mt-2">
                <div className="bg-white border border-black rounded-md p-0.5">
                  {bookName.length < 11 ? (
                    <p className="text-sm m-1">Title: {bookName}</p>
                  ) : ( 
                    <p className="text-sm">{bookName.substring(0, 10)}...</p>
                  )}
                </div>
                {/* <p className="text-sm font-semibold">{"NTD " + minPrice}</p> */}
              </div>
              <div className="bg-white h-8 border border-black rounded-md p-0.5">
                <p className="text-sm m-1">Author:</p>
              </div>
              <div className="bg-white h-8 border border-black rounded-md p-0.5">
                <p className="text-sm m-1">Price:</p>  
              </div>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              {/* <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-500">Quantity: {totalQuantity}</p>
                <p className="text-sm text-gray-500">Sold: {totalSold}</p>
              </div> */}
              <div className=" relative border border-black bg-white h-72 rounded-md p-2">
                <p className="text-sm m-1"> Description:</p>
                <button className="text-xs absolute text-center border border-black bottom-0 right-0 m-2 bg-custom hover:bg-yellow-500 text-black py-1 px-3 rounded-2xl"
                onClick={handleDetail}>
                  More...
                  </button>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex justify-center item-center border border-black bg-white rounded-md p-0.5 w-8 h-8">
                  <IconButton onClick={handleOnClick} className="hover:text-lime-700">
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
                <button className="text-center border border-black bg-white rounded-md py-1 px-6 h-8 text-sm">Add To My Cart</button>
              </div>
            </div>
          {/* </div> */}
        </div>
        
      </div>
  );
}
