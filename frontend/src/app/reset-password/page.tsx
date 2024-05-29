import ResetPasswordForm from "./_components/ResetPasswordForm";

export default async function Home() {
    
    return (
        <main className="flex h-screen border-2 flex-col items-center justify-center">
            <ResetPasswordForm/>
        </main>
    );
}