export interface MediaItem {
  id: number
  title?: string
  name?: string
  media_type: "movie" | "tv"
  release_date?: string
  first_air_date?: string
  poster_path: string
  vote_average: number
  popularity: number
  overview: string
}

