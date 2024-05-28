import RegisterForm from './_components/registerForm';

export default async function Home() {
    
    return (
        <main className="flex h-screen border-2 flex-col items-center justify-center">
            <RegisterForm/>
        </main>
    );
}