import User from '../models/User.js';
class UsersController {

    getUser(req, res) {
        const user = new User;
        const details = req.query;
        user.find(details)
            .then(([users]) => res.json(users))
            .catch(err => res.json(err));
    }

    getUserById(req , res) {
        const user = new User;
        const id = parseInt(req.params.id);
        user.findById(id)
            .then(([users]) => res.json(users))
            .catch(err => res.json(err)); 
    }

    postUser(req, res) {
        const user = new User;
        const details = req.body;
        console.log(details);
        user.create(details)
            .then(([users]) => res.json(users))
            .catch(err => res.json(err));
    }

    updateUser(req, res) {
        const user = new User;
        const details = req.body;
        user.update(details)
            .then(([users]) => res.json(users))
            .catch(err => res.json(err));
    }

    deleteUser(req, res) {
        const user = new User;
        const id = parseInt(req.params.id);
        user.delete(id)
            .then(([users]) => res.json(users))
            .catch(err => res.json(err));
    }
}


export default new UsersController;