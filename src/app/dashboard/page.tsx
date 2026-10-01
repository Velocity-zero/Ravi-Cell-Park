import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export const revalidate = 0; // Disable caching to always show latest inventory

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="glass-panel p-8 text-center text-red-400">
        Error loading inventory. Please check your database connection.
      </div>
    );
  }

  return <DashboardClient initialProducts={products || []} />;
}
