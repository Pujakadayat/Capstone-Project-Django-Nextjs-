import Link from "next/link";
import LoginForm from "@/components/users/GenericForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <LoginForm type="register" />
      <p className="mt-6 text-sm text-gray-600">
        Already have an account?
        <Link href="/login" className="text-black font-medium underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
