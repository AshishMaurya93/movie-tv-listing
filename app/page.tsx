"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MediaList from "@/components/MediaList"
import SearchBar from "@/components/SearchBar"
import FilterSort from "@/components/FilterSort"
import DetailPopup from "@/components/DetailPopup"
import Pagination from "@/components/Pagination"
import type { MediaItem } from "@/types/MediaItem"

export default function Home() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterYear, setFilterYear] = useState("")
  const [sortCriteria, setSortCriteria] = useState("popularity")

  const fetchItems = useCallback(
    async (page: number) => {
      setIsLoading(true)
      try {
        let endpoint = searchQuery
          ? `/api/search?query=${encodeURIComponent(searchQuery)}&page=${page}`
          : `/api/trending?page=${page}`

        if (filterType !== "all") {
          endpoint += `&type=${filterType}`
        }
        if (filterYear) {
          endpoint += `&year=${filterYear}`
        }
        endpoint += `&sort=${sortCriteria}`

        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error("Failed to fetch items")
        }
        const data = await response.json()
        setMediaItems(data.results || [])
        setTotalPages(data.total_pages || 1)
        setTotalResults(data.total_results || 0)
        setIsLoading(false)
      } catch (err) {
        setError("An error occurred while fetching data")
        setIsLoading(false)
      }
    },
    [searchQuery, filterType, filterYear, sortCriteria],
  )

  useEffect(() => {
    fetchItems(currentPage)
  }, [currentPage, fetchItems])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    // fetchItems will be called due to the dependency change
  }

  const handleFilter = (type: string, year: string) => {
    setFilterType(type)
    setFilterYear(year)
    setCurrentPage(1)
    // fetchItems will be called due to the dependency change
  }

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria)
    setCurrentPage(1)
    // fetchItems will be called due to the dependency change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-dark text-white d-flex flex-column"
    >
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <SearchBar onSearch={handleSearch} />
        <FilterSort onFilter={handleFilter} onSort={handleSort} />
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-danger">{error}</div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-8">No results found</div>
        ) : (
          <>
            <MediaList items={mediaItems} onItemClick={setSelectedItem} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
      <Footer />
      {selectedItem && <DetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </motion.div>
  )
}

