import Sidebar from "@/components/common/Sidebar";
import { ROLE_KEY } from "@/constants/constants";
import { Role } from "@/types/user";
import { cookies } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get(ROLE_KEY)?.value as Role | undefined;
  return (
    <div className="min-h-screen bg-white flex">
      <aside className="w-56 border-r border-black shrink-0">
        <Sidebar role={role ?? null} />
      </aside>
      <main className="flex-1 px-12 py-10 overflow-y-auto">{children}</main>
    </div>
  );
}
