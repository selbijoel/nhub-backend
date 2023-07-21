const {z} = require("zod");   //install zod (npm i zod)   //every end point should have its own validator

const recipesValidator = z.object({      //send this to your recipe.validator.js file.

    name: z.string(),
    process: z.string(),
    duration: z.number().optional()

});

const loginValidator = z.object({

    username: z.string(),
    password: z.string().min(8)

});


const registerValidator = z.object({

    name: z.string(),
    role: z.enum(['CHEF', 'SOUS_CHEF'])

}).and(loginValidator);


const getRecipesValidator = z.object({

    id: z.string().length(24)

})

const updateRecipesValidator = z.object({

    recipes: recipesValidator.array()

}).and(getRecipesValidator);

module.exports = {

    loginValidator,
    registerValidator,
    getRecipesValidator,
    recipesValidator
}