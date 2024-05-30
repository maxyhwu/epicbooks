import { userType } from "@/lib/types";
import bcrypt from "bcryptjs";
//const baseURL = "https://epicbooks-950h.onrender.com/api"
const baseURL = "http://localhost:8000/api"
export default function useUsers(){
    const getUserInfo = async(username: string) =>{
        const response  =  await fetch(`${baseURL}/getUserInfo/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.ok){
            const userInfo: userType = await response.json()
            return userInfo
        }else{
            console.error('Failed to get user info:', response.status);
        }
    }
    const Register = async (password: string, email: string, username: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const registerResponse = await fetch(`${baseURL}/register`, {
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
            const response = await registerResponse.text();
            console.log(response);
            return response;
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
            const loginResponse = await fetch(`${baseURL}/login/?email=${email}`, {
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
            const forgotPasswordResponse = await fetch(`${baseURL}/forgotPassword`, {
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

    return{
        getUserInfo,
        Register,
        Login,
        forgotPassword,
    };
}
