import useBooks from "@/hooks/useBook";
import useUsers from "@/hooks/useUsers";
import CartItem from "./_components/CartItem";
import Summary from "./_components/Summary";
type Pageprops = {
    searchParams: {
      username: string,
    }
  };

type SummaryProps = {
    bookId: number;
    title: string;
    quantity: number;
    price: number;
    author: string;
    image: string;
    username: string;
}
  
export default async function SalesCartPage({searchParams:{username}}: Pageprops){
    const { getUserInfo } = useUsers(); 
    const { getBookInfo } = useBooks();
    const userInfo = await getUserInfo(username);
    const cartList = userInfo?.salesCart;
    const summary: SummaryProps[] = [];
    if(cartList){
        const summaryPromises = cartList?.map(async (cart) => {
            const bookInfo = await getBookInfo(Number(cart.itemId))
            const temp = {
                bookId: Number(cart.itemId),
                title: bookInfo?.title,
                quantity: cart.quantity,
                price: bookInfo?.price,
                author: bookInfo?.author,
                image: bookInfo?.image,
            } as SummaryProps
            return temp
        })
        const summaryResults = await Promise.all(summaryPromises);
        summary.push(...summaryResults);
    }
    return(
        <div className="flex shadow-md my-3">
            <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Sales Cart</h1>
                    <h2 className="font-semibold text-2xl">{cartList?.length ?? 0} Items</h2>
                </div>
                <div className="flex mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 ">Quantity</h3>
                    <h3 className="font-semibold text-center  text-gray-600 text-sm uppercase w-1/5 ">Price</h3>
                    <h3 className="font-semibold text-center  text-gray-600 text-sm uppercase w-1/5 ">Total</h3>
                </div>
                <div>
                    {   
                        cartList?.map((cart, index)=>(
                            <CartItem
                                bookId={Number(cart.itemId)}
                                quantity={Number(cart.quantity)}
                                username={username}
                                title={summary[index].title}
                                image={summary[index].image}
                                author={summary[index].author}
                                price={summary[index].price}
                                key={index}
                            />
                        ))
                        
                    }   
                </div>
            </div>
            <Summary summaries={summary} username={username} />
        </div>

    );
}