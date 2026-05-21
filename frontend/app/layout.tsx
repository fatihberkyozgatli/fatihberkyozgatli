import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: 'Fatih Berk Yozgatli - Software Engineer & Creative Technologist',
  description: 'Computer Science and Data Science graduate building full-stack systems, data workflows, AI-powered tools, and human-centered technology.',
  generator: 'fatihOS',
  keywords: ['Software Engineer', 'Full-Stack Developer', 'Data Engineer', 'AI Engineer', 'Creative Technologist'],
  authors: [{ name: 'Fatih Berk Yozgatli' }],
  openGraph: {
    title: 'Fatih Berk Yozgatli - Software Engineer & Creative Technologist',
    description: 'Computer Science and Data Science graduate building full-stack systems, data workflows, AI-powered tools, and human-centered technology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatih Berk Yozgatli - Software Engineer & Creative Technologist',
    description: 'Building systems that connect data, people, and ideas.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
