import useBooks from "@/hooks/useBook";
import useCarts from "@/hooks/useCart";
import FavoriteItem from "./_components/CartItem";
export default async function CartPage(){
    const {getFavorite} = useCarts();   
    const {getBookInfo} = useBooks();
    //need user name from db
    const FavIdList = await getFavorite("some user name") 
    // let favItems: booksType[] = [];
    // FavIdList?.forEach(async (fav)=>{
    //     const favItem = await getBookInfo(fav as number);
    //     favItems.push(favItem)
    // })
    return(
        <div className="flex shadow-md my-3 justify-center">
            <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">My Favorite Books</h1>
                    <h2 className="font-semibold text-2xl">3 Items</h2>
                </div>
                <div className="flex mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Quantity</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Price</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Total</h3>
                </div>
                <div>
                    <FavoriteItem/>
                    <FavoriteItem/>
                    <FavoriteItem/>
                </div>
            </div>
        </div>

    );
}

