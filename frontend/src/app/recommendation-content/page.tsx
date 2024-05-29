import useBooks from "@/hooks/useBook";
import CartButton from "../_components/CartButton";
import MyFavButton from "../_components/MyFavButton";
import { booksType } from "@/lib/types";
import RecomPreview from "./_components/RecomPreview";

type RecomProps ={
    searchParams:{
      queryString: string,
    }
  }
export default async function Home({searchParams: {queryString} }: RecomProps) {
    const { getRecommendations } = useBooks();
    const recommendationBooks = await getRecommendations(queryString);

    return (
        <main className="min-h-screen items-start rounded-b-xl border-2">
            <div className="w-full flex-col justify-between">
                <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
                    <p className="text-2xl pt-2 font-semibold">Result of {queryString}</p>
                    <div className="flex items-center justify-center gap-5 text-2xl">
                    <MyFavButton/>
                    <CartButton/>
                    </div>
                </div>
            </div>
            <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
                {recommendationBooks?.map((book: booksType) => (
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
        </main> 
    );
}