import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT, useGlobalContext } from './context'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const SingleMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: "" })

  const fetchMovie = async (url) => {
    console.log(url);
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      if (data.Response === 'False') {
        setError({ show: true, msg: data.Error })
      } else {
        setMovie(data)
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`)
  }, [id])

  if (isLoading) {
    return <div className="loading"></div>
  }

  if (error.show) {
    return <div className="page-error">
      <h1>{error.msg}</h1>
      <Link to="/" className="btn">back to movies</Link>
    </div>
  }

  const { Title: title, Year: year, Poster: poster, Plot: plot } = movie
  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? url : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link className="btn" to="/">back to movies</Link>
      </div>
    </section>
  )
}

export default SingleMovie
