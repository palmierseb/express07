import Model from "./model.js";

class Movie extends Model {
    constructor() {
        super();
        this.table = "movies";
        this.model = new Model();
    }

    async find(details) {
        return this.model.find(this.table, details);
    }

    async findAll() {
        return this.model.findAll(this.table);
    }

    async findById(id) {
        return this.model.findById(this.table, id);
    }

    async create(details) {
        return this.model.create(this.table, details);
    }
    
    async update(details) {
        return this.model.update(this.table, details);
    }

    async delete(id) {
        return this.model.delete(this.table, id);
    }

}

export default Movie;
