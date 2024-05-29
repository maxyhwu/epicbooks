import useUsers from "./useUsers";

export default function useCarts(){
    const { getUserInfo } = useUsers();
    const addToCart = async (username: string, bookId: Number) => {
        const response  =  await fetch(`http://localhost:8000/api/addToCart/?username=${username}?bookId=${bookId}` , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            return response.json();
        } else {
            console.error('Failed to add favorite:', response.status);
        }
    }
    const addFavorite = async (username: string, bookId: Number) => {
        const response  =  await fetch(`http://localhost:8000/api/addFavorite/?username=${username}&bookId=${bookId}` , {
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
        const response  =  await fetch(`http://localhost:8000/api/removeFavorite/?username=${username}&bookId=${bookId}` , {
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
        const response = await fetch(`http://localhost:8000/api/getFavorite/?username=${username}`, {
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
    return{
        addFavorite,
        getFavorite,
        removeFavorite,
        addToCart,
    };
}
