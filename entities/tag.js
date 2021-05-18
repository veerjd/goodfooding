module.exports = function buildMakeTag({ Tag }) {
  return function makeTag({
    id,
    name,
    metaTagId,
    created_at = Date.now(),
    modified_at = Date.now()
  } = {}) {
    if ((!name || name < 2)) {
      throw new Error('Tag name must include at least two characters of text.')
    }
    if (!Number.isFinite(metaTagId) && Tag.isExistingTag(metaTagId)) {
      throw new Error('Tag name must include at least two characters of text.')
    }

    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getMetaTagId: () => Tag.getMetaTagNameFromId(metaTagId),
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at
    })
  }
}