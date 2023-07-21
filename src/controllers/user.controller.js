const {UserModel} = require("../models/user.model");
const validator = require("../validators/user.validator");
const bcrypt = require("bcrypt");

function formatZodError(errors) {

    return errors.map((error)  => error.path.join(".").concat (":", error.message));

}

//login
async function login(req, res) {
   const result = validators.loginValidator.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json(formatZodError(result.error.issues)).end();
    }
    
    
    const user = await UserModel.findOne({username: req.body.username});

    if (!user) return res.send("User not found!!").end();

    if (!bcrypt.compareSync (req.body.password, user.password))return res.send("Password incorrect!!").end();

    user.password = undefined;

    res.json(user).end();
}

async function register(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    
    await UserModel.create({
        name: req.body.name,
        username: req.body.username,
        password: encryptedPassword,
        role: req.body.role
    })

    res.send("User created!!").end();
}

async function getAllRecipes(req, res) {

    const user = await UserModel.findById(req.params.id);

    res.json(user.recipes).end();
}

async function updateRecipes(req,res) {
    await UserModel.updateOne( /*filter: */ {_id: req.params.id}, /*update: */{

        $push: {
            recipes: {$each: req.body.recipes}
        }

        
    });

            res.send("recipes added").end();
}

module.exports = {
    login,
    register,
    getAllRecipes,
    updateRecipes,
}