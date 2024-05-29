import CartButton from "@/app/_components/CartButton";
import MyFavButton from "@/app/_components/MyFavButton";
import RecomSelect from "./_components/RecomSelect";

export default async function Home() {

  return (
    <main className="flex min-h-screen items-start rounded-b-xl border-2">
      <div className="w-full flex-col justify-between">
        <div className="flex justify-between px-10 item-center border-b border-b-gray-700 p-5">
          <p className="text-2xl pt-2 font-semibold">You might like...</p>
          <div className="flex items-center justify-center gap-5 text-2xl">
            <MyFavButton/>
            <CartButton />
          </div>
        </div>
        <RecomSelect/>
      </div>
    </main>
  );
}
