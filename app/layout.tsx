import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'react-hot-toast'
import AlertsClient from '@/components/AlertsClient'
import PwaInstallPrompt from '@/components/PwaInstallPrompt'
import OfflineBanner from '@/components/OfflineBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SafeNova - Disaster Preparedness Education System',
  description: 'Comprehensive disaster preparedness and response education system for schools and colleges',
  keywords: 'disaster preparedness, emergency response, education, safety training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <script dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/service-worker.js').catch(() => {}); }); }` }} />
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
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}