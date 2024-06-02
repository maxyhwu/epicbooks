import { booksType, userType } from "@/lib/types";
import bcrypt from "bcryptjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useBooks from "./useBook";

export default function useUsers(){
    // const searchParams = useSearchParams();
    // const params = new URLSearchParams(searchParams);
    // const username = params.get("username");
    const { getBookInfo } = useBooks();
    // useEffect(() => {
    //     getUserInfo(username ?? "");
    // }, []);
    
    const getUserInfo = async(username: string) =>{
        if (!username) {
            return null;
        }
        try{
            const response  =  await fetch(`http://localhost:8000/api/getUserInfo/?username=${username}`, {
            method: 'GET',
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
            },
            })
            if(response.ok){
                const userInfo:userType = await response.json();
                return userInfo;
            }else{
                console.error('Failed to get user info:', response.status);
                return null;
            }
        }catch(error){
            console.log(error);
        }
        
    }

    const isInFav = async(username: string, bookId: string) =>{
        try{
            if (!username) {
                return null;
            }
            const userInfo = await getUserInfo(username);
            if (userInfo) {
                return userInfo.favorite.includes(Number(bookId));
            }
            else {
                return null;
            }
            
        }catch(error){
            console.log(error);
        }
        
    }

    const getUserFav = async(username: string) =>{
        try{
            const userInfo = await getUserInfo(username);
            if (userInfo) {
                userInfo.favorite.forEach(async(fav) => {
                    const bookInfo = await getBookInfo(Number(fav));
                    
                })  
                
                
                return null;
            }
            else {
                return null;
            }
            
        }catch(error){
            console.log(error);
        }
        
    }

    const Register = async (password: string, email: string, username: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const registerResponse = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password: hashedPassword,
                address: "",
                phone: "",
            }),
        });


        if (registerResponse.ok) {
            const newUser:userType = await registerResponse.json();
            return newUser;

          } else {
            console.error("Failed to register user.");
            return null;
          }

        }catch(error){
            console.log(error);
        }
    }

    const Login = async(email: string, password:string) => {
        try {
            const loginResponse = await fetch(`http://localhost:8000/api/login/?email=${email}`, {
            cache: "no-store",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (loginResponse.ok) {
            const result:userType = await loginResponse.json();
            const isValid = await bcrypt.compare(password, result.password as string);
            if (isValid) {
                return result;
            }
            else {
                return null;
            }
          } else {
            console.error("Failed to login user.");
            return null;
          }

        }catch(error){
            console.log(error);
        }
    }

    const forgotPassword = async(username: string, email:string) => {
        try {
            const forgotPasswordResponse = await fetch(`http://localhost:8000/api/forgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
            }),
        });


        if (forgotPasswordResponse.ok) {
            return true;
          } else {
            console.error("Failed to verify email and username.");
            return false;
          }

        }catch(error){
            console.log(error);
        }
    }

    const resetPassword = async(token: string, newPassword:string) => {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const resetPasswordResponse = await fetch(`http://localhost:8000/api/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                newPassword: hashedPassword,
            }),
        });


        if (resetPasswordResponse.ok) {
            return true;
          } else {
            console.error("Failed to reset password.");
            return false;
          }

        }catch(error){
            console.log(error);
        }
    }

    return{
        getUserInfo,
        isInFav,
        getUserFav,
        Register,
        Login,
        forgotPassword,
        resetPassword,
    };
}
