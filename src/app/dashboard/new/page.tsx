import { addProduct } from "./actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard" 
          className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors border border-white/5"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
          <p className="text-zinc-400 text-sm">Enter the details for the new inventory item</p>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8">
        <form action={addProduct} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Product Name</label>
            <input 
              name="name"
              type="text" 
              required
              placeholder="e.g., Samsung 25W Fast Adapter" 
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Category</label>
            <select 
              name="category"
              required
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
            >
              <option value="" disabled selected>Select a category</option>
              <option value="Chargers & Adapters">Chargers & Adapters</option>
              <option value="Cables">Cables</option>
              <option value="Earphones & Earbuds">Earphones & Earbuds</option>
              <option value="Speakers & Soundbars">Speakers & Soundbars</option>
              <option value="Cases & Covers">Cases & Covers</option>
              <option value="Screen Protectors">Screen Protectors (Glasses)</option>
              <option value="Storage (Pendrives/SD)">Storage (Pendrives/SD)</option>
              <option value="Other Accessories">Other Accessories</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Fixed Price (₹)</label>
              <input 
                name="fixed_price"
                type="number" 
                min="0"
                step="0.01"
                required
                placeholder="0.00" 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-red-400 ml-1">Bargain Limit (₹)</label>
              <input 
                name="min_price"
                type="number" 
                min="0"
                step="0.01"
                required
                placeholder="0.00" 
                className="w-full bg-black/20 border border-red-500/30 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <p className="text-xs text-zinc-500 ml-1">The absolute lowest price acceptable.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Initial Stock</label>
            <input 
              name="stock"
              type="number" 
              min="0"
              required
              defaultValue="1"
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
