import path from 'path'

const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const simonSays = require('./services/simonsays.service.ts')
const simonSaysController = require('./controller/simonsays.controller.ts')

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    }
    app.use(cors(corsOptions))
}

app.get(
    '/api/simon-says',
    (
        req: { cookies: { highScore: string } },
        res: { cookie: (arg0: string, arg1: string) => void; send: (arg0: string) => void }
    ) => {
        let highScore = 0
        if (!req.cookies.highScore) {
            const user = simonSays.newUser()
            res.cookie('highScore', JSON.stringify(user))
        } else {
            highScore = simonSays.get(JSON.parse(req.cookies.highScore).id).score
        }
        res.send(highScore.toString())
    }
)
app.post(
    '/api/simon-says',
    (
        req: { cookies: { highScore: string }; body: { score: any } },
        res: { cookie: (arg0: string, arg1: string) => void; send: (arg0: any) => any }
    ) => {
        const { id: userId } = JSON.parse(req.cookies.highScore)
        const userScore = simonSaysController.getUpdatedScore(userId, req.body.score)
        const user = { id: userId, score: userScore }
        res.cookie('highScore', JSON.stringify(user))
        return res.send(userScore.toString())
    }
)

app.listen(3030, () => console.log('Server ready at port 3030!'))
