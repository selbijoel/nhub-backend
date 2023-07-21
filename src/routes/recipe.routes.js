const {Router} = require("express");
const controller = require("../controllers/recipe.controller");
const {checkAdmin} = require("../middlewares/auth.middleware");

const router = Router();

// get all recipes
router.get('/', controller.getAllRecipes);

// get single recipe
router.get('/:recipeId', controller.getSingleRecipe);

// add new recipe
router.post('/', checkAdmin, controller.addRecipe);

// update recipe
router.patch('/:recipeId', checkAdmin, controller.udpateRecipe);

// delete recipe
router.delete('/:recipeId', checkAdmin, controller.deleteRecipe);

module.exports.recipesRouter = router;