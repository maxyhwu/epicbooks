import useUsers from "./useUsers";
const baseURL = "http://localhost:8000/api"
export default function useCarts(){
    const { getUserInfo } = useUsers();
    const addToCart = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/addToCart/?username=${username}?bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const responseText = response.text();
            return responseText;
        } else {
            console.error('Failed to add to cart:', response.status);
        }
    }
    const removeFromCart = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/removeFromCart/?username=${username}&bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const responseText = response.text();
            return responseText;
        } else {
            console.error('Failed to remove from cart:', response.status);
        }
    }
    const getCart = async (username: string) =>{
        const response = await fetch(`${baseURL}/getCart/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        if(response.ok){
            const cartIdList: Number[] = await response.json();
            return cartIdList;
        } else {
            console.error('Failed to get cart:', response.status);
        }
    }
    const addFavorite = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/addFavorite/?username=${username}&bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            return true;
        } else {
            console.error('Failed to add favorite:', response.status);
        }
    }
    const removeFavorite = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/removeFavorite/?username=${username}&bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            return true;
        } else {
            console.error('Failed to remove favorite:', response.status);
        }
    }
    const getFavorite = async (username: string) =>{
        const response = await fetch(`${baseURL}/getFavorite/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        if(response.ok){
            const FavIdList: Number[] = await response.json();
            return FavIdList;
        } else {
            console.error('Failed to get favorite:', response.status);
        }
    }
    const addToSalesCart = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/addToSalesCart/?username=${username}?bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const responseText = response.text();
            return responseText;
        } else {
            console.error('Failed to add to sales cart:', response.status);
        }
    }
    const removeFromSalesCart = async (username: string, bookId: Number) => {
        const response  =  await fetch(`${baseURL}/removeFromSalesCart/?username=${username}&bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const responseText = response.text();
            return responseText;
        } else {
            console.error('Failed to remove from sales cart:', response.status);
        }
    }
    const getSalesCart = async (username: string) =>{
        const response = await fetch(`${baseURL}/getSalesCart/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        if(response.ok){
            const salesCartIdList: Number[] = await response.json();
            return salesCartIdList;
        } else {
            console.error('Failed to get sales cart:', response.status);
        }
    }

    return{
        addFavorite,
        getFavorite,
        removeFavorite,
        addToCart,
        removeFromCart,
        getCart,
        addToSalesCart,
        removeFromSalesCart,
        getSalesCart,
    };
}
