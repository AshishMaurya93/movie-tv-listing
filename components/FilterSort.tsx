import { useState } from "react"

interface FilterSortProps {
  onFilter: (type: string, year: string) => void
  onSort: (criteria: string) => void
}

export default function FilterSort({ onFilter, onSort }: FilterSortProps) {
  const [type, setType] = useState("all")
  const [year, setYear] = useState("")

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value
    setType(newType)
    onFilter(newType, year)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value
    setYear(newYear)
    onFilter(type, newYear)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value)
  }

  return (
    <div className="mb-4 d-flex flex-column flex-md-row gap-3 align-items-start">
      <div className="d-flex gap-2 flex-grow-1">
        <select className="form-select" onChange={handleTypeChange} value={type}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <input
          type="number"
          className="form-control"
          placeholder="Filter by year"
          onChange={handleYearChange}
          value={year}
        />
      </div>
      <select className="form-select" onChange={handleSortChange}>
        <option value="popularity.desc">Sort by Popularity</option>
        <option value="vote_average.desc">Sort by Rating</option>
        <option value="primary_release_date.desc">Sort by Release Date</option>
      </select>
    </div>
  )
}

