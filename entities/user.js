module.exports = function buildMakeUser() {
  return function makeUser({
    id,
    discordId,
    createdAt = Date.now(),
    modifiedAt = Date.now()
  } = {}) {
    if ((!discordId || discordId < 4) && !Number.isFinite(discordId)) {
      throw new Error('Step must include at least one character of text.')
    }

    return Object.freeze({
      getId: () => id,
      getDiscordId: () => discordId,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt
    })
  }
}