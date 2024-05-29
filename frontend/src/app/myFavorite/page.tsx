import useBooks from "@/hooks/useBook";
import useCarts from "@/hooks/useCart";
import { booksType } from "@/lib/types";
import FavoriteItem from "./_components/FavoriteItem";
type Pageprops = {
    searchParams: {
      username: string,
    }
  };
  
export default async function CartPage({searchParams:{username}}: Pageprops){
    const {getFavorite} = useCarts();   
    const {getBookInfo} = useBooks();
    //need user name from db
    const FavIdList = await getFavorite(username) 
    let favItems: booksType[] = [];
    console.log(FavIdList)
    FavIdList?.forEach(async (fav)=>{
        console.log("id"+fav)
        const favItem = await getBookInfo(fav as number);
        favItems.push(favItem as booksType)
    })
    
    return(
        <div className="flex shadow-md my-3 justify-center">
            <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">My Favorite Books</h1>
                    <h2 className="font-semibold text-2xl">{favItems.length} Items</h2>
                </div>
                <div className="flex justify-between mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                </div>
                <div>
                    {
                        favItems?.map((favItem) =>(
                            <FavoriteItem
                                title={favItem.title}
                                author={favItem.author}
                                image={favItem.image}
                                price={favItem.price}
                                key={favItem.id.toString()}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

