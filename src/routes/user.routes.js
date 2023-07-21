const {Router} = require("express");
const { udpateRecipe } = require("../controllers/recipe.controller");
const controller= require("../controllers/user.controller");
const {clientLogin} = require("../middlewares/login.middleware")

const router = Router();

router.post("/login", clientLogin, controller.login);
router.post("/register", controller.register);

router.route("/:id/recipes")

    .get(getRecipes)
    .patch(udpateRecipe);


//router.get(path: "/recipes");
//router.patch(path: "/recipes");


module.exports = {
    userRouter: router
}
