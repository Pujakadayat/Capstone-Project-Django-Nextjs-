import Link from "next/link";
import LoginForm from "@/components/users/GenericForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <LoginForm type="login" />
      <p className="mt-6 text-sm text-gray-600">
       Don't have an account?
        <Link href="/register" className="text-black font-medium underline">
         Register
        </Link>
      </p>
    </div>
  );}