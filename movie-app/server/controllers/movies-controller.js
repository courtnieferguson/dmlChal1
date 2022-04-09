// Import database
const knex = require('./../db')

// Retrieve all movies
exports.moviesAll = async (req, res) => {
    // Get all movies from database
    knex
        .select('*') // select all records
        .from('movies') // from 'movies' table
        .then(userData => {
            // Send movies extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving movies: ${err}` })
        })
}

// Create new movie
exports.moviesCreate = async (req, res) => {
    // Add new movie to database
    knex('movies')
        .insert({ // insert new record, a movie
            'director': req.body.director,
            'title': req.body.title,
            'releaseDate': req.body.releaseDate,
            'rating': req.body.rating
        })
        .then(() => {
            // Send a success message in response
            res.json({ message: `Movie \'${req.body.title}\' by ${req.body.director} created.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
        })
}

// Remove specific movie
exports.moviesDelete = async (req, res) => {
    // Find specific movie in the database and remove it
    knex('movie')
        .where('id', req.body.id) // find correct record based on id
        .del() // delete the record
        .then(() => {
            // Send a success message in response
            res.json({ message: `Movie ${req.body.id} deleted.` })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting ${req.movie.id} movie: ${err}` })
        })
}

// Remove all movies on the list
exports.moviesReset = async (req, res) => {
    // Remove all movies from database
    knex
        .select('*') // select all records
        .from('movies') // from 'movies' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'Movie list cleared.' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting movie list: ${err}.` })
        })
}