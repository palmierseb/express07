import User from "../models/User.js";
import Auth from "../models/Auth.js";
class AuthController {

   async login(req, res) {
        const { email, password } = req.body;
        if(!email || !password) {
            console.log("Please enter all fields");
        } else {
            const auth = new Auth();
            const result = await auth.login(email, password);
            if(result) {
                res.cookie("token", result, { 
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true 
                });
                res.setHeader("Authorization", `Bearer ${result}`);
                res.redirect("/dashbord");
            } else {
                res.redirect("/login");
            }
        }
        res.render("Auth/login");
    }
    async register(req ,res) {
        const { firstname, lastname, email, password } = req.body;
        const details = {
            firstname,
            lastname,
            email,
            password
        }
        if(!firstname || !lastname || !email || !password) {
            res.render("Auth/register");
        } else {
            if (password === req.body.password_confirmation ) {
                const user = new User();
                const result = await user.create(details);
                if(result) {
                    res.render("Auth/login");
                } else {
                    res.render("Auth/register");
                }
                res.render("Auth/login");
            } else {
                console.log('passwords do not match');
            }
        }
        res.render("Auth/register");
    }

    verifyToken(req, res, next) {
        const token = req.cookies.token;
        if(!token) {
            res.redirect("/login");
        } else {
            next();
        }
    }

    dashbord(req, res) {
        res.render("Auth/dashbord");
    }
    
}

export default new AuthController();