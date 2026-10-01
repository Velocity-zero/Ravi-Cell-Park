"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const fixed_price = parseFloat(formData.get("fixed_price") as string);
  const min_price = parseFloat(formData.get("min_price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);

  const supabase = await createClient();

  const { error } = await supabase.from("products").insert([
    {
      name,
      category,
      fixed_price,
      min_price,
      stock,
    },
  ]);

  if (error) {
    console.error("Error inserting product:", error);
    throw new Error("Failed to add product");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
