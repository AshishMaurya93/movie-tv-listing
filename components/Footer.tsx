import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">&copy; 2023 Movie & TV Show Listings</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
            alt="TMDB Logo"
            width={50}
            height={50}
          />
        </a>
      </div>
    </footer>
  )
}

