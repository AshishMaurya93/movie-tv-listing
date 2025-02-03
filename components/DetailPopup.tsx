import { motion } from "framer-motion"
import type { MediaItem } from "@/types/MediaItem"
import { useEffect, useRef } from "react"

interface DetailPopupProps {
  item: MediaItem
  onClose: () => void
}

export default function DetailPopup({ item, onClose }: DetailPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={popupRef}
        className="bg-dark text-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{item.title || item.name}</h2>
          <button onClick={onClose} className="text-white text-2xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="w-full md:w-1/3 h-auto rounded"
          />
          <div className="flex-1">
            <p className="mb-2">
              <strong>Type:</strong> {item.media_type === "movie" ? "Movie" : "TV Show"}
            </p>
            <p className="mb-2">
              <strong>Release Date:</strong> {item.release_date || item.first_air_date}
            </p>
            <p className="mb-2">
              <strong>Rating:</strong> {item.vote_average}/10
            </p>
            <p className="mb-4">{item.overview}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

