import BookPreview from "@/app/_components/BookPreview";
import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import useBooks from "@/hooks/useBook";
import { booksType } from "@/lib/types";

type Pageprops = {
  searchParams: {
    searchName: string;
    mode: string;
  };
};

export default async function Home({
  searchParams: { searchName },
}: Pageprops) {
  const {getNewArrival} = useBooks();
  const newArrivals = await getNewArrival();
  

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
          <p className="text-2xl pt-2 font-semibold">New Arrival</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            {/* <GetSerachName /> */}
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        <p className="text-center mt-6 text-2xl font-bold">Today</p>
        <div className="mt-2 grid w-full grid-cols-3 gap-10 px-10 py-5">
        {
            newArrivals?.map((newArrival:booksType) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={"/IMazon.ico"}
              key={newArrival?.id?.toString()}
            />
            ))
          }
          
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
        <p className="text-center mt-10 text-2xl font-bold">Recent 7 days</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {
            newArrivals?.map((newArrival:booksType) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={"/IMazon.ico"}
              key={newArrival?.id?.toString()}
            />
            ))
          }
        </div>
      </div>
    </main>
  );
}
