import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import RecomPreview from "./_components/RecomPreview";

type Pageprops = {
  searchParams: {
    searchName: string;
    mode: string;
  };
};

export default async function Home({
  searchParams: { searchName, mode },
}: Pageprops) {

  return (
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
        <div className="mt-5 grid w-full grid-cols-3 gap-10 px-10 py-5">

          <RecomPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <RecomPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <RecomPreview
              bookId={"test"}
              bookName={"New Book"}
              // mode={mode}
              key={"test_id"}
            />
            <RecomPreview
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
