import { NextResponse } from "next/server"

const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "1"
  const type = searchParams.get("type") || "all"
  const year = searchParams.get("year") || ""
  const sort = searchParams.get("sort") || "popularity.desc"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  }

  try {
    let url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`

    if (type !== "all") {
      url = `https://api.themoviedb.org/3/discover/${type}?language=en-US&page=${page}`
    }

    if (year) {
      url += `&primary_release_year=${year}`
    }

    url += `&sort_by=${sort}`

    const response = await fetch(url, options)
    const data = await response.json()
    data.results = data.results.map((item: { media_type: any }) => ({
      ...item,
      media_type: type === "all" ? item.media_type : type,
    }))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching trending items:", error)
    return NextResponse.json({ error: "Failed to fetch trending items" }, { status: 500 })
  }
}

