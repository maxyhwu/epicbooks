import useBooks from "@/hooks/useBook";
import useCarts from "@/hooks/useCart";
import { booksType } from "@/lib/types";
import FavoriteItem from "./_components/FavoriteItem";
import useUsers from "@/hooks/useUsers";
type Pageprops = {
    searchParams: {
      username: string,
    }
  };
  
export default async function CartPage({searchParams:{username}}: Pageprops){
    const { getUserInfo } = useUsers(); 
    const { getBookInfo } = useBooks();
    let books:booksType[] = [];
    const userInfo = await getUserInfo(username);
    const favList = userInfo?.favorite;
    
    
    return(
        <div className="flex shadow-md my-3 justify-center">
            <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">My Favorite Books</h1>
                    <h2 className="font-semibold text-2xl">{favList?.length} Items</h2>
                </div>
                <div className="flex justify-between mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                </div>
                <div>
                    {
                        favList?.map((favItem, i) =>(
                            <FavoriteItem
                                bookId = {favItem}
                                username={username}
                                key={i}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

