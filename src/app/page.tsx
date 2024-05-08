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



import BookPreview from "./_components/BookPreview";
import CartButton from "./_components/CartButton";
import MyFavButton from "./_components/MyFavButton";

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
          <p className="text-2xl pt-2 font-semibold">ePicBook, A Picture Books E-commerse Website</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            {/* <GetSerachName /> */}
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {/* {products.map((product) => (
            <ProductPreview
              productId={product.id}
              productName={product.productName}
              mode={mode}
              key={product.id}
            />
          ))} */}
          <BookPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BookPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BookPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <BookPreview
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
