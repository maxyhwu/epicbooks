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
    bookId: Number;
    quantity: Number;
    price: Number
}
  
export default async function CartPage({searchParams:{username}}: Pageprops){
    const { getUserInfo } = useUsers(); 
    const { getBookInfo } = useBooks();
    const userInfo = await getUserInfo(username);
    const cartList = userInfo?.cart;
    let summary: SummaryProps[] = [];
    if(cartList){
        const summaryPromises = cartList?.map(async (cart) => {
            const bookInfo = await getBookInfo(Number(cart.itemId))
            const temp = {
                bookId: Number(cart.itemId),
                quantity: cart.quantity,
                price: bookInfo?.price
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
                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                    <h2 className="font-semibold text-2xl">{cartList?.length ?? 0} Items</h2>
                </div>
                <div className="flex mt-8 mb-6">
                    <h3 className="font-semibold text-gray-600 text-sm uppercase w-2/5">Product Details</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Quantity</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Price</h3>
                    <h3 className="font-semibold text-center text-gray-600 text-sm uppercase w-1/5 text-center">Total</h3>
                </div>
                <div>
                    {   
                        cartList?.map((cart)=>(
                            <CartItem
                            bookId={cart.itemId}
                            quantity={cart.quantity}
                            username={username}
                            key={cart.itemId.toString()}/>
                        ))
                        
                    }   
                </div>
            </div>
            <Summary summaries={summary}/>
        </div>

    );
}