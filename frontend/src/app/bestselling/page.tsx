// import { redirect } from "next/navigation";

// import { publicEnv } from "@/lib/env/public";


// export default async function Home() {
//   // const session = await auth();
//   // if (!session?.user?.id) {
//   //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/auth`);
//   // } else {
//   //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop`);
//   // }
//   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop`);
// }



import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import BestSellingPreview from "@/app/bestselling/_components/BestSellingPreview";

type Pageprops = {
  searchParams: {
    searchName: string;
    mode: string;
  };
};

export default async function Home({
  searchParams: { searchName, mode },
}: Pageprops) {
  // const session = await auth();
  // const userId = session?.user?.id;
  // if (!userId) {
  //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  // }
  // console.log(searchName);
  // const products = await db
  //   .select({
  //     id: productTable.displayId,
  //     productName: productTable.productName,
  //   })
  //   .from(productTable)
  //   .where(like(productTable.productName, `${searchName ?? ""}%`))
  //   .execute();

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
          <p className="text-2xl pt-2 font-semibold">Best Selling</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            {/* <GetSerachName /> */}
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        <p className="text-center mt-6 text-2xl font-bold">Ranking</p>
        <div className="relative mt-2 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {/* {products.map((product) => (
            <ProductPreview
              productId={product.id}
              productName={product.productName}
              mode={mode}
              key={product.id}
            />
          ))} */}
          <BestSellingPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BestSellingPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BestSellingPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BestSellingPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
        </div>
      </div>
    </main>
  );
}
