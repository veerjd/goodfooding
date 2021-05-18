module.exports = function buildMakeUser() {
  return function makeUser({
    id,
    discordId,
    created_at = Date.now(),
    modified_at = Date.now()
  } = {}) {
    if ((!discordId || discordId < 4) && !Number.isFinite(discordId)) {
      throw new Error('Step must include at least one character of text.')
    }

    return Object.freeze({
      getId: () => id,
      getDiscordId: () => discordId,
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at
    })
  }
}