import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-dark py-4">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-white text-2xl font-bold">
          Movie & TV Show Listings
        </Link>
      </div>
    </header>
  )
}

