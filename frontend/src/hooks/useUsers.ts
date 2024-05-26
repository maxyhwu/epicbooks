
export default function useUsers(){
    const getUserInfo = async () => {
        const response  =  await fetch("http://localhost:8000/api/getUserInfo" , {
            method: 'GET',
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
