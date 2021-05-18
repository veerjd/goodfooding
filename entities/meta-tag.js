module.exports = function buildMakeMetaTag() {
  return function makeMetaTag({
    id,
    name,
    created_at = Date.now(),
    modified_at = Date.now()
  } = {}) {
    if ((!name || name < 2)) {
      throw new Error('Tag name must include at least two characters of text.')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at
    })
  }
}