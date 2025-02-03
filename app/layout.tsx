import { Inter } from "next/font/google"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Movie & TV Show Listings",
  description: "Browse and search for movies and TV shows",
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

