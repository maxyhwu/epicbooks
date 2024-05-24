import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import useBooks from "@/hooks/useBook";
import { booksType } from "@/lib/types";
import BestSellingPreview from "./_components/BestSellingPreview";
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
  const {getBestSellings} = useBooks();
  
  const bestsellings = await getBestSellings();
  
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
        {
            bestsellings?.map((book:booksType) =>(
              <BestSellingPreview
              bookId={book.id.toString()}
              bookName={book.title}
              price={book.price}
              author={book.author}
              description={book.description}
              image={"/IMazon.ico"}
              key={book.id.toString()}
            />
            ))
          }
        </div>
      </div>
    </main>
  );
}
