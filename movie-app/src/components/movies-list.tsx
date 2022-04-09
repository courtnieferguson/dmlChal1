import React from 'react'

// Import components
import { MoviesListRow } from './movies-list-row'

// Import styles
import './../styles/movies-list.css'

// Create interfaces
interface MovieUI {
    id: number;
    director: string;
    title: string;
    releaseDate: string;
    rating: string;
}

interface MoviesListUI {
    movie: MovieUI[];
    loading: boolean;
    handleMovieRemove: (id: number, title: string) => void;
}

// Create MoviesList component
export const MoviesList = (props: MoviesListUI) => {
    // Show loading message
    if (props.loading) return <p>Leaderboard table is loading...</p>

    return (
        <table className="table">
            <thead>
            <tr>
                <th className="table-head-item" />

                <th className="table-head-item">Title</th>

                <th className="table-head-item">Director</th>

                <th className="table-head-item">Release date</th>

                <th className="table-head-item">Rating</th>

                <th className="table-head-item" />
            </tr>
            </thead>

            <tbody className="table-body">
            {props.movie.length > 0 ? (
                props.movie.map((movie: MovieUI, idx) => (
                        <MoviesListRow
                            key={movie.id}
                            movie={movie}
                            position={idx + 1}
                            handleMovieRemove={props.handleMovieRemove}
                        />
                    )
                )
            ) : (
                <tr className="table-row">
                    <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no movies to show. Create one!</td>
                </tr>
            )
            }
            </tbody>
        </table>
    )
}
