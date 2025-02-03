import { motion } from "framer-motion"
import type { MediaItem } from "@/types/MediaItem"

interface MediaListProps {
  items: MediaItem[]
  onItemClick: (item: MediaItem) => void
}

export default function MediaList({ items, onItemClick }: MediaListProps) {
  return (
    <div className="row row-cols-1 row-cols-md-5 row-cols-lg-6 g-4">
      {items.map((item) => (
        <motion.div key={item.id} className="col" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="card h-100 bg-secondary text-white" onClick={() => onItemClick(item)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              className="card-img-top"
              alt={item.title || item.name}
            />
            <div className="card-body small">
              <h6 className="card-title">{item.title || item.name}</h6>
              <p className="card-text">{item.media_type === "movie" ? "Movie" : "TV Show"}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

