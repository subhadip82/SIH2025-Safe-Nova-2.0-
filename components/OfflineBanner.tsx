"use client";
import React, { useEffect, useState } from "react";

const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;
  const handleDownload = () => {
    const notes = `EMERGENCY SITUATION NOTES\n\n- Police: 100\n- Fire Department: 101\n- Medical Emergency: 102\n- Disaster Management: 108\n- Women Helpline: 1091\n- Child Helpline: 1098\n\nKeep these numbers and your emergency plan accessible at all times.`;
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-situation-notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-yellow-400 text-black text-center py-2 font-semibold shadow-lg animate-pulse flex flex-col items-center gap-2">
      <span>You are offline. Some features may be unavailable.</span>
      <button
        onClick={handleDownload}
        className="mt-1 px-4 py-1 bg-white text-yellow-700 rounded shadow font-semibold border border-yellow-500 hover:bg-yellow-100 transition-all"
      >
        Download Emergency Situation Notes
      </button>
    </div>
  );
};

export default OfflineBanner;
