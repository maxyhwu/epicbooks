import { booksType } from "@/lib/types";

// const baseURL = "https://epicbooks-950h.onrender.com/api"
const baseURL = "http://localhost:8000/api"
export default function useBooks(){
    const generateBooks = async () => {
        const response  =  await fetch(`${baseURL}/genRandomBooks` , {
            method: 'PUT',
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
    const getAllBooks = async () =>{
        const response = await fetch(`${baseURL}/getRandomBooks`,{
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
          }
        })
        if (response.ok) {
            const books: booksType[] = await response.json();
            // Now books contains the parsed JSON data
            return books
        } else {
            console.error('Failed to fetch random books:', response.status);
        }
      }

    const getBestSellings = async () =>{
        const response = await fetch(`${baseURL}/getBestSellings`,{
            method: 'GET',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const bestSellings: booksType[] = await response.json();
            // Now books contains the parsed JSON data
            return bestSellings
        } else {
            console.error('Failed to fetch best-selling books:', response.status);
        }
    }
    const getNewArrival = async () =>{
        const response = await fetch(`${baseURL}/getNewArrival`,{
            method: 'GET',
            headers: {
            'Content-Type' : 'application/json',
            }
        })
        if (response.ok) {
            const newArrivals: booksType[][] = await response.json();
            // Now books contains the parsed JSON data
            return newArrivals
        } else {
            console.error('Failed to fetch new-arrival books:', response.status);
        }
    }

    const getRecommendations = async(genres: string) =>{
        const response = await fetch(`${baseURL}/getRecommendations/?genres=${genres}`, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json', 
            }
        })
        if(response.ok){
            const recommendations: booksType[] = await response.json();
            return recommendations
        }else{
            console.error('Failed to fetch recommendations:', response.status);
        }
    }

    const getBookInfo = async (bookId: number) =>{
        const response = await fetch(`${baseURL}/getBookInfo/?bookId=${bookId}`,{
            method: 'GET',
            headers: {
            'Content-Type' : 'application/json',
            },
        })
        if (response.ok) {
            const bookInfo: booksType = await response.json();
            // Now books contains the parsed JSON data
            return bookInfo
        } else {
            console.error(`Failed to fetch book ${bookId} info:`, response.status);
        }
    }
    
    return{
        getAllBooks,
        generateBooks,
        getBestSellings,
        getNewArrival,
        getRecommendations,
        getBookInfo,
    };
}
