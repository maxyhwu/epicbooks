import { booksType } from "@/lib/types";
import RecomPreview from "./RecomPreview";

type RecomBooklistProps = {
    bookList:booksType[];
}

export default function RecomBooklist({ bookList }: RecomBooklistProps) {
    return (
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">
                {bookList.map((book: booksType, i) => (
                    <RecomPreview
                        bookId={book.id.toString()}
                        bookName={book.title.toString()}
                        price={book.price}
                        author={book.author.toString()}
                        description={book.description.toString()}
                        image={book.image.toString()}
                        genres={book.genre as [string]}
                        key={i}
                    />
                ))}
          </div>
    );
}