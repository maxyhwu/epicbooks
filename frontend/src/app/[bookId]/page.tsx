// import { auth } from "@/lib/auth";

import CartButton from "../_components/CartButton";
import MyFavButton from "../_components/MyFavButton";
import BookDetail from "./_components/BookDetail";

// import { db } from "@/db";
// import { commentsTable } from "@/db/schema";
// import { publicEnv } from "@/lib/env/public";
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";
// import CartButton from "../_components/CartButton";
// import ProductDescription from "./_components/ProductDescription";
// import ProductDetail from "./_components/ProductDetail";
// import ReviewInput from "./_components/ReviewInput";
// import {
//   getProductDetail_1,
//   getProductDetail_2,
//   getProductPhotos,
// } from "./_components/actions";

// type Props = {
//   params: { productId: string };
// };

// async function ProductPage({ params }: Props) {
//   const images = await getProductPhotos(params.productId);
//   const detail_1 = await getProductDetail_1(params.productId);
//   const detail_2 = await getProductDetail_2(params.productId);

//   const comments = await db.query.commentsTable.findMany({
//     where: eq(commentsTable.productId, params.productId),
//     with: {
//       user: {
//         columns: {
//           name: true,
//         }
//       }
//     },
//     columns: {
//       content: true,
//       userId: true,
//       rate: true,
//     },
//   });

//   let rate:GLfloat = 0;
//   comments.forEach((comment) => {
//     rate += comment.rate;
//   })

//   rate = rate/comments.length;
//   const session = await auth();
//   const userId = session?.user?.id;
//   if (!userId) {
//     redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
//   }



//   return (
//     <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2 px-10">
//       <div className="flex w-full flex-wrap bg-white justify-between items-start">
//         <ProductDetail detail_1={detail_1} detail_2={detail_2} rate={rate ? rate.toString().substring(0,3): "no review"} images={images}  commentQuantity={comments.length ?? 0}/>
//         <div className="mt-10">
//           <CartButton/>
//         </div>
//       </div>
//       <div className="mt-16 px-8 flex justify-between w-full">
//         <ProductDescription productId={params.productId} />
//         <div className="min-h-screen w-2/5 grow overflow-y-scroll border-2 bg-white rounded-md">
//           <div  className="flex items-baseline">
//             <p className="font-normal p-5 text-2xl">評論</p>
//             {userId === detail_1.sellerdisplayId && <p className="text-teal-900 font-semibold">( You can't comment your product! )</p>}
//           </div>
          
//           {userId !== detail_1.sellerdisplayId && <ReviewInput userId={userId} productId={params.productId}/>}

//           { comments.length === 0 && <p className="w-full text-gray-500 text-center mt-10">There's still no comment for this product.</p>}
//           <div className="mt-5 w-full flex-col gap-2">
//             {comments.map((comment, index) => (
//               <div key={index} className="w-full border px-10 py-16">
//                 <div className="flex text-xs">
//                     {comment.rate === 1 && (
//                       <>
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                       </>
//                     )}
//                     {comment.rate === 2 && (
//                       <>
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                       </>
//                     )}
//                     {comment.rate === 3 && (
//                       <>
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarOutlineIcon />
//                         <StarOutlineIcon />
//                       </>
//                     )}
//                     {comment.rate === 4 && (
//                       <>
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarOutlineIcon />
//                       </>
//                     )}
//                     {comment.rate === 5 && (
//                       <>
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                         <StarRateIcon className="text-yellow-500" />
//                       </>
//                     )}
//                   </div>
//                   <div className="flex justify-between mt-2">
//                       <p className="font-medium">{comment.user.name}:</p>
//                       <p className="w-4/5">{comment.content}</p>
//                   </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
      
//   );
// }

// export default ProductPage;
export default function BookDetailPage(){
  return(
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
        <p className="text-2xl pt-2 font-semibold">Book Detail</p>
        <div className="flex items-center justify-center gap-5 text-2xl">
          {/* <GetSerachName /> */}
          <MyFavButton/>
          <CartButton />
        </div>
      </div>
      <div className="flex items-center justify-center pt-10 px-10 ">
        <div className="flex justify-center bg-custom h-screen w-screen rounded-lg ">
          <BookDetail/>
        </div>
      </div>
    </div>
  </main>
  )
}