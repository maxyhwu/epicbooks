import CartButton from "@/app/_components/CartButton";
import useBooks from "@/hooks/useBook";
import useUsers from "@/hooks/useUsers";
import MyFavButton from "../_components/MyFavButton";
import BookDetail from "./_components/BookDetail";

type Pageprops = {
  searchParams: {
    bookId: number,
    username: string,
  }
};

// export default ProductPage;
export default async function BookDetailPage({searchParams:{bookId, username}}: Pageprops){
  const { getBookInfo } = useBooks();
  // const { isInFav } = useUsers();
  const bookInfo = await getBookInfo(bookId);
  // const isFav = await isInFav(username, String(bookId))
  
  
  
  return(
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
        <p className="text-2xl pt-2 font-semibold">Book Detail</p>
        <div className="flex items-center justify-center gap-5 text-2xl">
          {/* <GetSerachName /> */}
          <MyFavButton/>
          <CartButton />
        </div>
      </div>
      <div className="flex items-center justify-center pt-10 px-10 ">
        <div className="flex justify-center bg-custom h-screen w-screen rounded-lg ">
          <BookDetail
            id={bookId}
            username={username}
            author={bookInfo?.author as string}
            price={bookInfo?.price as number}
            title={bookInfo?.title as string}
            sales={bookInfo?.sales as number}
            publishDate={bookInfo?.publishDate as Date}
            publisher={bookInfo?.publisher as string}
            image={bookInfo?.image as string}
            genre={bookInfo?.genre as [string]}
            language={bookInfo?.language as string}
            description={bookInfo?.description as string}
            key={bookId}
          />
        </div>
      </div>
    </div>
  </main>
  )
}