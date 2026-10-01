"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // If we want to return the error to the UI, we would return it here
    // For simplicity, we can redirect back with an error param, but returning is cleaner.
    return { error: error.message };
  }

  // Successfully logged in
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
