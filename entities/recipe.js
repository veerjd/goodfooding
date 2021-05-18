module.exports = function buildMakeRecipe({ Url }) {
  return function makeRecipe({
    id,
    userId,
    author,
    source = userId,
    name,
    description = 'A Goodfoodie recipe',
    // serves,
    // prepTime,
    // cookTime,
    // diets = [],
    ingredients = [],
    steps = [],
    created_at = Date.now(),
    modified_at = Date.now(),
    curated = false
  } = {}) {
    if (!userId) {
      throw new Error('Recipe must be inserted by a user.')
    }
    if (!name || name.length < 1) {
      throw new Error('Recipe name must include at least one character of text.')
    }
    // if (!serves || serves < 1) {
    //   throw new Error('Must indicate how many people does the recipe serve.')
    // }
    if (Array.isArray(steps) || steps.length < 1) { // TODO add steps validation from Steps injection
      throw new Error('Recipe must have at least one step.')
    }
    if (Array.isArray(ingredients) || ingredients.length < 1) { // TODO add ingredient validation from Ingredient injection
      throw new Error('Recipe must have at least one ingretient.')
    }
    if (!source || Url.isValidUrl(source)) { // TODO add url validation from Url injection
      throw new Error('Recipe must have a source url.')
    }

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getAuthor: () => author,
      changeAuthor: (newAuthor) => author = newAuthor,
      getSource: () => source,
      changeSource: (newSource) => source = newSource,
      getName: () => name,
      changeName: (newName) => name = newName,
      getDescription: () => description,
      changeDescription: (newDescription) => description = newDescription,
      // getServes: () => serves,
      // changeServes: (newServe) => serves = newServe,
      // getDiets: () => diets,
      // addDiets: (newDiet) => diets.push(newDiet),
      // removeDiets: (dietToDelete) => diets.filter(diet => diet !== dietToDelete),
      getSteps: () => steps,
      addSteps: (newStep) => steps.push(newStep),
      removeSteps: (stepToDelete) => steps.filter(step => step !== stepToDelete),
      getIngredients: () => ingredients,
      addIngredients: (newIngredient) => ingredients.push(newIngredient),
      removeIngredients: (ingredientToDelete) => ingredients.filter(ingredient => ingredient !== ingredientToDelete),
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at,
      isCurated: () => curated,
      curate: () => {
        curated = true
      },
      unCurated: () => {
        curated = false
      }
    })
  }
}