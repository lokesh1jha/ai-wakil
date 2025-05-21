import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Wakil - Your AI-Powered Legal Assistant',
  description: 'Simplify legal document analysis with AI-powered insights, instant summaries, and smart clause detection.',
  keywords: ['AI', 'legal assistant', 'document analysis', 'legal tech', 'contract review'],
  authors: [{ name: 'AI Wakil Team' }],
  openGraph: {
    title: 'AI Wakil - Your AI-Powered Legal Assistant',
    description: 'Simplify legal document analysis with AI-powered insights, instant summaries, and smart clause detection.',
    url: 'https://aiwakil.com',
    siteName: 'AI Wakil',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Wakil - Your AI-Powered Legal Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 