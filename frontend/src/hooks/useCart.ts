
export default function useCarts(){
    const addFavorite = async (username: string, bookId: number) => {
        const response  =  await fetch("http://localhost:8000/api/addFavorite" , {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {

            return true;
        } else {
            console.error('Failed to generate random books:', response.status);
        }
    }
    return{
        
    };
}
