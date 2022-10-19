import Model from "./model.js";

class User extends Model {
    constructor() {
        super();
        this.table = "users";
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

    async findByEmail(email) {
        return this.model.findByEmail(this.table, email);
    }

    async hashPassword(password) {
        return this.model.hashPassword(password);
    }

    async verifyPassword(password, hash) {
        return this.model.verifyPassword(password, hash);
    }

    async create(details) {
        console.log(details);
        const hashedPassword = await this.hashPassword(details.password);
        const user = {
            firstname: details.firstname,
            lastname: details.lastname,
            email: details.email,
            password: hashedPassword
        }
        return this.model.create(this.table, user);
    }

    async update(details) {
        return this.model.update(this.table, details);
    }

    async delete(id) {
        return this.model.delete(this.table, id);
    }
}


export default User;