import Link from "next/link";
import { PackageSearch, Plus, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center gap-2 text-white font-bold text-xl">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <PackageSearch className="w-5 h-5 text-white" />
                </div>
                Ravi Cell Park
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/new"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium border border-white/5"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
