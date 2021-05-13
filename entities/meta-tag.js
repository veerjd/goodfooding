module.exports = function buildMakeMetaTag() {
  return function makeMetaTag({
    id,
    name,
    createdAt = Date.now(),
    modifiedAt = Date.now()
  } = {}) {
    if ((!name || name < 2)) {
      throw new Error('Tag name must include at least two characters of text.')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt
    })
  }
}