import { NextResponse } from "next/server"

const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const page = searchParams.get("page") || "1"
  const type = searchParams.get("type") || "all"
  const year = searchParams.get("year") || ""
  const sort = searchParams.get("sort") || "popularity.desc"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  }

  try {
    let url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`

    if (type !== "all") {
      url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
    }

    if (year) {
      url += `&year=${year}`
    }

    url += `&sort_by=${sort}`

    const response = await fetch(url, options)
    const data = await response.json()
    data.results = data.results.map((item: { media_type: any; first_air_date: any }) => ({
      ...item,
      media_type: type === "all" ? item.media_type || (item.first_air_date ? "tv" : "movie") : type,
    }))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching items:", error)
    return NextResponse.json({ error: "Failed to search items" }, { status: 500 })
  }
}

