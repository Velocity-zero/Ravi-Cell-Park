"use client";

import { Smartphone, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { login } from "./actions";
import { useState, useTransition } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 sm:p-12">
      <div className="glass-panel w-full max-w-md p-8 sm:p-12 relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <Smartphone className="text-white w-8 h-8" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
            Ravi Cell Park
          </h1>
          <p className="text-zinc-400 text-center mb-6">
            Store Inventory & Price Management
          </p>

          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-start gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="admin@ravicellpark.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isPending ? "Authenticating..." : "Secure Login"}
              {!isPending && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              Only authorized personnel can access bargain prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
