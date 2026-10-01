"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type BarcodeScannerProps = {
  onResult: (result: string) => void;
  onClose: () => void;
};

export default function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Initialize the scanner
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 150 }, aspectRatio: 1.0 },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => {
        // Stop scanning when a result is found
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
        onResult(decodedText);
      },
      (error) => {
        // ignore errors (it logs a lot when it can't find a barcode)
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onResult]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f1115] w-full max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-white font-semibold">Scan Barcode</h3>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            Close
          </button>
        </div>
        
        {/* The scanner library needs an element with id="reader" */}
        <div id="reader" className="w-full bg-black"></div>
        
        <div className="p-4 text-center text-sm text-zinc-400">
          Point your camera at the product's barcode to instantly find it.
        </div>
      </div>
    </div>
  );
}
