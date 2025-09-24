"use client";
import React, { useEffect, useState } from "react";

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
    }
  };

  if (!showPrompt) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 animate-bounce">
      <span className="font-semibold">Install Safe Nova for a better experience!</span>
      <button
        onClick={handleInstall}
        className="bg-white text-blue-700 font-bold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all"
      >
        Download App
      </button>
    </div>
  );
};

export default PwaInstallPrompt;
