const { makeRecipe, makeIngredient, makeStep } = require('../entities')

module.exports = function buildCreateRecipe({ dbRecipe, dbIngredient, dbStep }) {
  return function createRecipe(recipeInfo) {

    const recipe = makeRecipe(recipeInfo)

    return dbRecipe
  }
}