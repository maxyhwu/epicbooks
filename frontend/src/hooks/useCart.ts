
export default function useCarts(){
    const addFavorite = async (username: string, bookId: Number) => {
        const response  =  await fetch(`http://localhost:8000/api/addFavorite/?username=${username}?bookId=${bookId}` , {
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
    const getFavorite = async (username: string) =>{
        const response = await fetch(`http://localhost:8000/api/addFavorite/?username=${username}`, {
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
    };
}
