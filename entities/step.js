module.exports = function buildMakeStep({ Recipe, Step }) {
  return function makeStep({
    id,
    recipeId,
    rank = Step.getNextStep(recipeId),
    description,
    createdAt = Date.now(),
    modifiedAt = Date.now()
  } = {}) {
    if (!description || description.length < 1) {
      throw new Error('Step must include at least one character of text.')
    }
    if (!Recipe.isExistingRecipe(recipeId) && !Number.isFinite(recipeId)) {
      throw new Error('Must provide the related recipe id of an existing recipe.')
    }
    if (!rank && !Number.isFinite(rank)) {
      throw new Error('Must indicate how many people does the recipe serve.')
    }

    return Object.freeze({
      getId: () => id,
      getDescription: () => description,
      changeDescription: (newDescription) => description = newDescription,
      getRecipeId: () => recipeId,
      getRank: () => rank,
      changeRank: (newRank) => rank = newRank,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt
    })
  }
}