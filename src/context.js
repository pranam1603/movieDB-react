import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
console.log(API_ENDPOINT);
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ response: "true", msg: "no error" })
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('batman');

  const fetchMovie = async (url) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data.Search[3].Poster);
      if (data.Response === "True") {
        setMovies(data.Search)
        setError({ response: "true", msg: "" })
      } else {
        setError({ response: data.Response, msg: data.Error, })
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&s=${query}`)
  }, [query]);

  return <AppContext.Provider value={{ loading, query, error, setQuery, movies }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider }
