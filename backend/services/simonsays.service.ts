const utilService = require('./util.service.ts')
const fs = require('fs')

var scores = require('../data/scores.json')

module.exports = {
    get,
    newUser,
    updateScore,
}

function get(userId: any) {
    return scores.find((score: { id: any }) => score.id === userId)
}

function newUser() {
    const userId = utilService.makeId()

    const user = { id: userId, score: 0 }
    scores.push(user)
    _writeScoresToFile()
    return user
}

function updateScore(userId: string, score: number) {
    const userIdx = scores.findIndex((score: { id: string }) => score.id === userId)
    const user = scores[userIdx]
    if (user.score > score) return user.score

    scores[userIdx].score = score
    _writeScoresToFile()
    return score
}

function _writeScoresToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(scores, null, 2)
        fs.writeFile('data/scores.json', data, (err: any) => {
            if (err) return rej(err)
            res('')
        })
    })
}
