import { userType } from "@/lib/types";
import bcrypt from "bcryptjs";
import { useSearchParams } from "next/navigation";
export default function useUsers(){
    const searchParams = useSearchParams();
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

    return{
        Register,
        Login,
        forgotPassword,
    };
}
