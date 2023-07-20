import './globals.css'
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'PiecePedia - Guess One Piece!',
  description: 'Guess your favorite One Piece characters!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
