const simonSays = require('../services/simonsays.service.ts')

module.exports = {
    getUpdatedScore,
}

function getUpdatedScore(userId: string, userScore: string) {
    return simonSays.updateScore(userId, userScore)
}
