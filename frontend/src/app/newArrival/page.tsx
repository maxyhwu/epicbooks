import BookPreview from "@/app/_components/BookPreview";
import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import useBooks from "@/hooks/useBook";
import { booksType } from "@/lib/types";

export default async function Home() {
  const { getNewArrival } = useBooks();
  const newArrivals = await getNewArrival();
  if (!newArrivals) {
    return;
  }
  
  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
          <p className="text-2xl pt-2 font-semibold">New Arrival</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        <p className="text-center mt-6 text-2xl font-bold">Today</p>
        <div className="mt-2 grid w-full grid-cols-3 gap-10 px-10 py-5">
        {
            newArrivals[0].map((newArrival:booksType, i) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={newArrival.image}
              key={i}
            />
            ))
          }
          
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
        <p className="text-center mt-10 text-2xl font-bold">Recent 7 days</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {
            newArrivals[1]?.map((newArrival:booksType, i) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={newArrival.image}
              key={i}
            />
            ))
          }
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
        <p className="text-center mt-10 text-2xl font-bold">Recent 30 days</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {
            newArrivals[2]?.map((newArrival:booksType, i) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={newArrival.image}
              key={i}
            />
            ))
          }
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
        <p className="text-center mt-10 text-2xl font-bold">Recent 90 days</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {
            newArrivals[3]?.map((newArrival:booksType, i) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={newArrival.image}
              key={i}
            />
            ))
          }
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
        <p className="text-center mt-10 text-2xl font-bold">Recent 365 days</p>
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
          {
            newArrivals[4]?.map((newArrival:booksType, i) =>(
              <BookPreview
              bookId={newArrival?.id?.toString()}
              bookName={newArrival.title}
              price={newArrival.price}
              author={newArrival.author}
              description={newArrival.description}
              image={newArrival.image}
              key={i}
            />
            ))
          }
        </div>
        <button className="text-xl font-bold text-right px-10 w-full underline">See More...</button>
      </div>
    </main>
  );
}
