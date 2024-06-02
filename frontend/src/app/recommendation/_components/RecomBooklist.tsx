import { booksType } from "@/lib/types";
import RecomPreview from "./RecomPreview";

type RecomBooklistProps = {
    bookList:booksType[];
}

export default function RecomBooklist({ bookList }: RecomBooklistProps) {
    return (
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
                {bookList.map((book: booksType) => (
                <RecomPreview
                    bookId={book.id.toString()}
                    bookName={book.title}
                    price={book.price}
                    author={book.author}
                    description={book.description}
                    image={book.image}
                    key={book.id.toString()}
                    genres={book.genre}
                />
                ))}
          </div>
    );
}