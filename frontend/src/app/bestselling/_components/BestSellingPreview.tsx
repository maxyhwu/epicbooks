"use client"
import { publicEnv } from "@/lib/env/public";
import StarIcon from '@mui/icons-material/Star';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { getProductDetails } from "../../warehouse/_components/action";


type BestSellingPreviewProps = {
  bookId: string;
  bookName: String;
  image: String;
  price: Number;
  author: String;
  description: String;
};

export default function BestSellingPreview({
  bookId,
  bookName,
  image,
  price,
  author,
  description,
}: BestSellingPreviewProps) {
  // const productDetails = await getProductDetails(bookId);
  const router = useRouter();
  let minPrice = Infinity;
  let totalQuantity = 0;
  let totalSold = 0; 

  const handleDetail = () =>{
    router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/${bookId}`);
  }

  return (
      <div className="relative"> 
        <StarIcon className="absolute -left-8 z-10 -top-8 h-16 w-16 text-yellow-400"></StarIcon>   
        <div className="h-full flex gap-5 justify-between w-full rounded-md border border-black p-3 shadow-sm bg-custom">
          {/* <div className="flex gap-5"> */}
            <div className="flex flex-col gap-2 w-1/2 min-h-full justify-between">
              <Image
                // src={`${productDetails[0].imageLink}`}
                src = {image.toString()}  
                alt="book_pic"
                width={200}
                height={50}
                className="max-h-48 min-h-48 max-w-full min-w-full border border-black rounded-md p-0.5"
              ></Image>
              <div className="flex flex-col gap-2">
                <div className="mt-2">
                  <div className="bg-white border border-black rounded-md p-0.5">
                    {bookName.length < 11 ? (
                      <p className="text-sm m-1">Title: {bookName}</p>
                    ) : ( 
                      <p className="text-sm m-1">Title: {bookName.substring(0, 10)}...</p>
                    )}
                  </div>
                  {/* <p className="text-sm font-semibold">{"NTD " + minPrice}</p> */}
                </div>
                <div className="bg-white h-8 border border-black rounded-md p-0.5">
                  <p className="text-sm m-1">Author: {author}</p>
                </div>
                <div className="bg-white h-8 border border-black rounded-md p-0.5">
                  <p className="text-sm m-1">Price: {price.toString()}</p>  
                </div>
              </div>
            </div>
            <div className="w-1/2 relative border border-black bg-white h-full rounded-md p-2">
              <p className="text-sm m-1"> Description: {description}</p>
              <button className="text-xs absolute text-center border border-black bottom-0 right-0 m-2 bg-custom hover:bg-yellow-500 text-black py-1 px-3 rounded-2xl"
              onClick={handleDetail}>
                More...
                </button>
            </div>
          {/* </div> */}
        </div>
      </div>
  );
}
