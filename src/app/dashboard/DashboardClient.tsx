"use client";

import { Package, Search, Tag, IndianRupee, Camera, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  fixed_price: number;
  min_price: number;
  stock: number;
};

export default function DashboardClient({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (data.query) {
        setSearchQuery(data.query);
      } else if (data.error) {
        alert("Scan failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error scanning image");
    } finally {
      setIsScanning(false);
      // Reset input so they can scan same file again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Inventory
        </h1>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
          />
          <button 
            onClick={handleScanClick}
            disabled={isScanning}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white p-2.5 rounded-xl shadow-lg transition-colors border border-white/10 shrink-0"
            title="Smart Scan"
          >
            {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {searchQuery && (
        <div className="text-sm text-zinc-400">
          Showing results for <span className="text-white font-medium">"{searchQuery}"</span>
          <button onClick={() => setSearchQuery("")} className="ml-2 text-blue-400 hover:underline">Clear</button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
          <p className="text-zinc-400 max-w-sm mb-6">
            Try adjusting your search or add a new product to your inventory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-panel p-5 group hover:bg-white/[0.08] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400 bg-white/5 inline-flex px-2 py-1 rounded-md border border-white/5">
                    <Tag className="w-3 h-3" />
                    {product.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Stock</div>
                  <div className={`text-sm font-bold ${product.stock > 5 ? 'text-green-400' : 'text-orange-400'}`}>
                    {product.stock} units
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 p-3 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Fixed Price</div>
                  <div className="text-white font-medium flex items-center mt-0.5">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {product.fixed_price}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Bargain Price</div>
                  <div className="text-red-400 font-medium flex items-center mt-0.5">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {product.min_price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
