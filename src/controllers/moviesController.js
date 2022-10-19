import Movie from '../models/Movie.js';

class MoviesController {
    
    getMovie(req, res) {
        const movie = new Movie;
        const details = req.query;
        movie.find(details)
            .then(([movies]) => res.json(movies))
            .catch(err => res.json(err));
    }

    getMovieById(req , res) {
        const movie = new Movie;
        const id = parseInt(req.params.id);
        movie.findById(id)
            .then(([movies]) => res.json(movies))
            .catch(err => res.json(err)); 
    }

    postMovie(req, res) {
        const movie = new Movie;
        const details = req.body;
        console.log(details);
        movie.create(details)
            .then(([movies]) => res.json(movies))
            .catch(err => res.json(err));
    }

    updateMovie(req, res) {
        const movie = new Movie;
        const details = req.body;
        movie.update(details)
            .then(([movies]) => res.json(movies))
            .catch(err => res.json(err));
    }

    deleteMovie(req, res) {
        const movie = new Movie;
        const id = parseInt(req.params.id);
        movie.delete(id)
            .then(([movies]) => res.json(movies))
            .catch(err => res.json(err));
    }

}

export default new MoviesController;