"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "react-hot-toast";
import AlertsClient from "@/components/AlertsClient";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import OfflineBanner from "@/components/OfflineBanner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <OfflineBanner />
            <PwaInstallPrompt />
            <AlertsClient />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}