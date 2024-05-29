import { userType } from "@/lib/types";
import bcrypt from "bcryptjs";
import { useSearchParams } from "next/navigation";
export default function useUsers(){
    const searchParams = useSearchParams();
    const getUserInfo = async(username: string) =>{
        const response  =  await fetch(`http://localhost:8000/api/getUserInfo/?username=${username}`, {
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
        const hashedPassword = await bcrypt.hash(password, 8);
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
        const hashedPassword = await bcrypt.hash(password, 8);
        try {
            const loginResponse = await fetch(`http://localhost:8000/api/login/?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (loginResponse.ok) {
            const result:userType = await loginResponse.json();
            console.log(String(result.password));
            console.log(hashedPassword);
            const isValid = await bcrypt.compare(String(result.password), hashedPassword);
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
    return{
        getUserInfo,
        Register,
        Login,
    };
}
