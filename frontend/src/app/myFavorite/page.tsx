import useBooks from "@/hooks/useBook";
import useUsers from "@/hooks/useUsers";
import FavoriteItem from "./_components/FavoriteItem";
type Pageprops = {
    searchParams: {
      username: string,
    }
  };

type FavoriteProps ={
    bookId: number;
    username: string;
    image: string;
    title: string;
    author: string;
    price: number;
}
export default async function MyFavoritePage({searchParams:{username}}: Pageprops){
    const { getUserInfo } = useUsers(); 
    const {getBookInfo} = useBooks();
    const userInfo = await getUserInfo(username);
    const favList = userInfo?.favorite;
    const bookList: FavoriteProps[] = [];
    if(favList){
        const favPromises = favList?.map(async (fav) =>{
            const bookInfo = await getBookInfo(Number(fav));
            const bookTemp = {
                bookId: fav,
                username: username,
                image: bookInfo?.image,
                title: bookInfo?.title,
                author: bookInfo?.author,
                price: bookInfo?.price,
            } as FavoriteProps
            return bookTemp
        })
        const favResults = await Promise.all(favPromises);
        bookList.push(...favResults);
    }
    
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
                        bookList?.map((favItem, i) =>(
                            <FavoriteItem
                                bookId = {Number(favItem.bookId)}
                                username={username}
                                price={Number(favItem.price)}
                                title={favItem.title}
                                author={favItem.author}
                                image={favItem.image}
                                key={i}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

