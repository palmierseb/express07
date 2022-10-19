import Model from "./model.js";
import Dotenv from "dotenv";
Dotenv.config();
class Auth extends Model {
    constructor() {
        super();
        this.table = "users";
        this.model = new Model();
    }

    async login(email, password) {
        await this.findByEmail(this.table, email)
        .then(async ([user]) => {
            if(!user[0]) {
                return false;
            }
            const valid = await this.verifyPassword(password, user[0].password);
            if(!valid) {
                return false;
            }
            this.token = this.generateToken(user[0].id);
            return this.token;
        });
        return this.token;
    }

    async register(email, password) {
        const user = await this.findByEmail(this.table, email);
        if(user) {
            return false;
        }
        const hash = await this.hashPassword(password);
        const newUser = await this.create({
            email,
            password: hash
        });
        this.user = newUser;
        this.token = this.generateToken();
        return this.token;
    }
}

export default Auth;