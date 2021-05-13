const Tag = {}
const Recipe = {}
const Step = {}
const Unit = {}
const Url = {}
const buildMakeUser = require('./user')
const buildMakeRecipe = require('./recipe')
const buildMakeIngredient = require('./ingredient')
const buildMakeStep = require('./step')
const buildMakeTag = require('./tag')
const buildMakeMetaTag = require('./meta-tag')

const makeUser = buildMakeUser()
const makeRecipe = buildMakeRecipe({ Url })
const makeIngredient = buildMakeIngredient({ Unit, Recipe })
const makeStep = buildMakeStep({ Recipe, Step })
const makeTag = buildMakeTag({ Tag })
const makeMetaTag = buildMakeMetaTag()

module.exports = {
  makeUser,
  makeRecipe,
  makeIngredient,
  makeStep,
  makeTag,
  makeMetaTag
}