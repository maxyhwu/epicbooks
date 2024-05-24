import useBooks from "@/hooks/useBook";
import { booksType } from "@/lib/types";
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
  const {generateBooks, getAllBooks} = useBooks();

  const msg = await generateBooks();
  
  const books = await getAllBooks();
  
  
  return (
    <main className="flex min-h-screen items-start rou  nded-b-xl border-2">
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
          {
            books?.map((book:booksType) =>(
              <BookPreview
              bookId={book.id.toString()}
              bookName={book.title}
              price={book.price}
              author={book.author}
              description={book.description}
              image={"/IMazon.ico"}
              // mode={mode}
              key={book.id.toString()}
            />
            ))
          }
         
        </div>
      </div>
    </main>
  );
}
