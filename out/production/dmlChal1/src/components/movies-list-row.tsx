// Import deps
// @ts-ignore
import React from 'react'

// Create interfaces
interface MoviesListRowUI {
    position: number;
    movie: {
        id: number;
        director: string;
        title: string;
        releaseDate: string;
        rating: string;
    }
    handleMovieRemove: (id: number, title: string) => void;
}

// Create MovieListRow component
export const MoviesListRow = (props: MoviesListRowUI) => (
    <tr className="table-row">
        <td className="table-item">
            {props.position}
        </td>

        <td className="table-item">
            {props.movie.title}
        </td>

        <td className="table-item">
            {props.movie.director}
        </td>

        <td className="table-item">
            {props.movie.releaseDate}
        </td>

        <td className="table-item">
            {props.movie.rating}
        </td>

        <td className="table-item">
            <button
                className="btn btn-remove"
                onClick={() => props.handleMovieRemove(props.movie.id, props.movie.title)}>
                Remove movie
            </button>
        </td>
    </tr>
)