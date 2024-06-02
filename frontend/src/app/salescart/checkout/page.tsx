import useBooks from "@/hooks/useBook";
import useUsers from "@/hooks/useUsers";
import TopButton from "../_components/TopButtons";
import CheckoutItem from "./_components/CheckoutItem";
type Pageprops = {
    searchParams: {
      username: string,
    }
  };

type CheckoutProps = {
    id: string;
    title: string;
    author: string;
    quantity: Number;
    price: Number;
    image: String;
}

export default async function CheckoutPage({searchParams:{username}}: Pageprops){
    // const { getCart } = useCarts();
    const {getUserInfo} = useUsers()
    const { getBookInfo } = useBooks()
    const userInfo = await getUserInfo(username);
    const cartItems = userInfo?.cart;
    let checkoutItems: CheckoutProps[] = [];
    let totalCost: Number = 0
    if(cartItems){
        const checkoutPromise = cartItems?.map( async (cart) =>{
            const book = await getBookInfo(Number(cart.itemId))
            totalCost = Math.floor(Number(totalCost) + Number(book?.price)*Number(cart.quantity)*0.8)
            const temp = {
                id: book?.id.toString(),
                title: book?.title,
                author: book?.author,
                quantity: cart.quantity,
                price: book?.price,
                image: book?.image
            } as CheckoutProps
            return temp
        })
        const checkoutResults = await Promise.all(checkoutPromise);
        checkoutItems.push(...checkoutResults);
    }
    
    return(
        <div>
            <div className="m-10 flex flex-col items-center px-5 gap-5">
                <div className="flex flex-row justify-between w-full items-center">
                    <TopButton cartItems={cartItems ?? []}/>
                </div>
                {
                    checkoutItems.map((item) =>(
                        <CheckoutItem 
                            price={item.price} 
                            author={item.author}
                            image={item.image}
                            quantity={item.quantity}
                            title={item.title}
                            key={item.id}
                        />
                    ))
                }
            </div>
            <div className="m-10 flex flex-col items-center px-5 gap-5">
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Delivery: Family Mart</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Note:</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Total: ${totalCost.toString()}</p>
                </div>
                <div className="border border-black w-full py-5 px-8">
                    <p id="delivery" className="text-md">Payment Method: Cash</p>
                </div>
            </div>
        </div>
        
    )
}
