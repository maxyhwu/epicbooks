import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import useBooks from "@/hooks/useBook";
import { booksType } from "@/lib/types";
import RecomPreview from "./_components/RecomPreview";
import RecomSelect from "./_components/RecomSelect";

type RecomProps ={
  searchParams:{
    username: string,
  }
}


export default async function Home({searchParams: {username}}: RecomProps) {
  const {getRecommendations} = useBooks();
  const recommendations = await getRecommendations(username);
  return (
    // {recommendations}
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
          <p className="text-2xl pt-2 font-semibold">You might like...</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            {/* <GetSerachName /> */}
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        {recommendations && recommendations.length > 0 ? (
          <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
            {recommendations.map((book: booksType) => (
              <RecomPreview
                bookId={book.id.toString()}
                bookName={book.title}
                price={book.price}
                author={book.author}
                description={book.description}
                image={book.image}
                key={book.id.toString()}
              />
            ))}
          </div>
        ) : (
          <RecomSelect username={username}/>
        )}
      </div>
    </main>
  );
}
