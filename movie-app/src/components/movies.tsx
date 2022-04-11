import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { MoviesList } from './movies-list'

// Import styles
import './../styles/movies.css'

// Create Bookshelf component
export const Movies = () => {
    // Prepare states
    const [director, setDirector] = useState('')
    const [title, setTitle] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [rating, setRating] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch all movies on initial render
    useEffect(() => {
        fetchMovies()
    }, [])

    // Fetch all movies
    const fetchMovies = async () => {
        // Send GET request to 'movies/all' endpoint
        axios
            .get('http://localhost:4001/movies/all')
            .then(response => {
                // Update the movies state
                setMovies(response.data)

                // Update loading state
                setLoading(false)
            })
            .catch(error => console.error(`There was an error retrieving the movie list: ${error}`))
    }

    // Reset all input fields
    const handleInputsReset = () => {
        setDirector('')
        setTitle('')
        setReleaseDate('')
        setRating('')
    }

    // Create new movie
    const handleMovieCreate = () => {
        // Send POST request to 'movies/create' endpoint
        axios
            .post('http://localhost:4001/movies/create', {
                director: director,
                title: title,
                releaseDate: releaseDate,
                rating: rating
            })
            .then(res => {
                console.log(res.data)

                // Fetch all movies to refresh
                // the movies on the movies list
                fetchMovies()
            })
            .catch(error => console.error(`There was an error creating the ${title} movie: ${error}`))
    }

    // Submit new movie
    const handleMovieSubmit = () => {
        // Check if all fields are filled
        if (director.length > 0 && title.length > 0 && releaseDate.length > 0 && rating.length > 0) {
            // Create new movie
            handleMovieCreate()

            console.info(`Movie ${title} by ${director} added.`)

            // Reset all input fields
            handleInputsReset()
        }
    }

    // Remove movie
    const handleMovieRemove = (id: number, title: string) => {
        // Send PUT request to 'movies/delete' endpoint
        axios
            .put('http://localhost:4001/movies/delete', { id: id })
            .then(() => {
                console.log(`Movie ${title} removed.`)

                // Fetch all movies to refresh
                // the movies on the movies list
                fetchMovies()
            })
            .catch(error => console.error(`There was an error removing the ${title} movie: ${error}`))
    }

    // Reset movie list (remove all movies)
    const handleListReset = () => {
        // Send PUT request to 'movies/reset' endpoint
        axios.put('http://localhost:4001/movies/reset')
            .then(() => {
                // Fetch all movies to refresh
                // the movies on the movies list
                fetchMovies()
            })
            .catch(error => console.error(`There was an error resetting the movie list: ${error}`))
    }

    return (
        <div className="movie-list-wrapper">
            {/* Form for creating new movie */}
            <div className="movie-list-form">
                <div className="form-wrapper" onSubmit={handleMovieSubmit}>
                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="title">Enter title:</label>
                            <input className="form-input" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="director">Enter Director:</label>
                            <input className="form-input" type="text" id="director" name="director" value={director} onChange={(e) => setDirector(e.currentTarget.value)} />
                        </fieldset>
                    </div>

                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="releaseDate">Enter release date:</label>
                            <input className="form-input" type="text" id="releaseDate" name="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="rating">Enter rating:</label>
                            <input className="form-input" type="text" id="rating" name="rating" value={rating} onChange={(e) => setRating(e.currentTarget.value)} />
                        </fieldset>
                    </div>
                </div>

                <button onClick={handleMovieSubmit} className="btn btn-add">Add the movie</button>
            </div>

            {/* Render movies list component */}
            <MoviesList movie={movies} loading={loading} handleMovieRemove={handleMovieRemove} />

            {/* Show reset button if list contains at least one movie */}
            {movies.length > 0 && (
                <button className="btn btn-reset" onClick={handleListReset}>Reset movie list.</button>
            )}
        </div>
    )
}