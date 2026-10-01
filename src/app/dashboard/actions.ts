"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  
  if (error) {
    console.error("Error deleting product:", error);
    return { error: error.message };
  }
  
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateStock(id: string, newStock: number) {
  if (newStock < 0) newStock = 0; // Prevent negative stock
  
  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", id);
    
  if (error) {
    console.error("Error updating stock:", error);
    return { error: error.message };
  }
  
  revalidatePath("/dashboard");
  return { success: true };
}
