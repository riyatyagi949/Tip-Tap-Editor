import "./globals.css"

export const metadata = {
  title: "OpenSphere Legal Editor",
  description: "Real-time paginated legal document editor",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-200">{children}</body>
    </html>
  )
}
