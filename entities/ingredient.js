module.exports = function buildMakeIngredient({ Unit, Recipe }) {
  return function makeIngredient({
    id,
    name,
    recipeId,
    rank = 1,
    quantity,
    unit,
    details = [],
    created_at = Date.now(),
    modified_at = Date.now()
  } = {}) {
    if (!name || name.length < 1) {
      throw new Error('Ingredient name must include at least one character of text.')
    }
    if (!Recipe.isExistingRecipe(recipeId) && !Number.isFinite(recipeId)) {
      throw new Error('Must provide the related recipe id of an existing recipe.')
    }
    if (!rank && !Number.isFinite(rank)) {
      throw new Error('Must indicate how many people does the recipe serve.')
    }
    if ((!quantity || quantity < 1) && !Number.isFinite(rank)) {
      throw new Error('Ingredient quantity should be at least 1.')
    }
    if (!Unit.isValidUnit(unit)) {
      throw new Error('Ingredient quantity should be at least 1.')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      changeName: (newName) => name = newName,
      getRecipeId: () => recipeId,
      getRank: () => rank,
      changeRank: (newRank) => rank = newRank,
      getQuantity: () => quantity,
      changeQuantity: (newQuantity) => quantity = newQuantity,
      getUnit: () => unit,
      changeUnit: (newUnit) => unit = newUnit,
      getDetails: () => details,
      changeDetails: (newDetails) => details = newDetails,
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at
    })
  }
}